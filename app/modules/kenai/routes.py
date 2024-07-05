import requests
import sys
import json
from flask import Blueprint, jsonify, request
from app.modules.utils.misc import handleResponse, handleErrorResponse
from langchain_community.llms import Ollama
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain_community.chat_message_histories import ChatMessageHistory
from app.modules.utils.misc import logging_error


mod = Blueprint('kenai', __name__, url_prefix='/kenai')



MODEL_NAME = 'kenai'
kenai = Ollama(model=MODEL_NAME)

@mod.route('/generate', methods=['POST'])
def generate_text():
    try:
        data = request.get_json()
        user = data.get('user', False)
        raw_prompt = data.get('prompt', '')
        
        prompt = ChatPromptTemplate.from_messages(
            [
                ( "system", "Let's practice english" if not user else f"You're talking with {user}, let's practice english",),
                MessagesPlaceholder(variable_name="messages"),
            ]
        )

        chain = prompt | kenai

        history = ChatMessageHistory()
        history.add_user_message(raw_prompt)
        kenai_stream_response = []
        for chunks in chain.stream({"messages": history.messages, "user_input": raw_prompt}):
            kenai_stream_response.append(chunks)
        kenai_response = ''.join(kenai_stream_response)
        history.add_ai_message(kenai_response)

        return handleResponse({
            "response": kenai_stream_response
        })
    except Exception as e:
        print('Ha ocurrido un error en @generate_text/{} en la linea {}'.format(e, sys.exc_info()[-1].tb_lineno))
        exc_type, exc_obj, exc_tb = sys.exc_info()
        logging_error({
            'fname': str(exc_tb.tb_frame.f_code.co_filename),
            'exc_type': str(exc_type),
            'lineno': str(exc_tb.tb_lineno),
            'error': str(e),
            'defname': 'generate_text'
        })
        return handleErrorResponse(e)


@mod.route('/alexa_generate', methods=['POST'])
def generate_text_alexa():
    USER = 'Alexa'
    try:
        data = request.get_json()
        raw_prompt = data.get('prompt', '')
        
        prompt = ChatPromptTemplate.from_messages(
            [
                ( "system", "Let's practice english without emojis only text"),
                MessagesPlaceholder(variable_name="messages"),
            ]
        )

        chain = prompt | kenai

        history = ChatMessageHistory()
        history.add_user_message(raw_prompt)
        kenai_response = chain.invoke({"messages": history.messages, "user_input": raw_prompt})

        return handleResponse({
            "response": kenai_response
        })
    except Exception as e:
        print('Ha ocurrido un error en @generate_text_alexa/{} en la linea {}'.format(e, sys.exc_info()[-1].tb_lineno))
        exc_type, exc_obj, exc_tb = sys.exc_info()
        logging_error({
            'fname': str(exc_tb.tb_frame.f_code.co_filename),
            'exc_type': str(exc_type),
            'lineno': str(exc_tb.tb_lineno),
            'error': str(e),
            'defname': 'generate_text_alexa'
        })
        return handleErrorResponse(e)
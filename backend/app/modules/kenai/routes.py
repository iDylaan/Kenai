import requests
import sys
import json
from flask import Blueprint, jsonify, request
from app.modules.utils.misc import handleResponse, handleErrorResponse
from langchain_community.llms import Ollama
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain_community.chat_message_histories import ChatMessageHistory


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
        print('Ha ocurrido un error en @create_solicitud/{} en la linea {}'.format(e, sys.exc_info()[-1].tb_lineno))
        handleErrorResponse(e)
import requests
import sys
import re
import json
from flask import Blueprint, jsonify, request
from app.modules.utils.misc import handleResponse, handleErrorResponse
from langchain_community.llms import Ollama
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain_community.chat_message_histories import ChatMessageHistory
from app.modules.utils.misc import logging_error
from .sql_strings import Sql_Strings as SQL_S
from app.modules.conf.conf_postgres import sqlv2, qry, sql


mod = Blueprint('kenai', __name__, url_prefix='/kenai')

kenai_title_gen = Ollama(model='kenai_title_gen')
kenai_nano = Ollama(model='kenai:2b')
kenai_mini = Ollama(model='kenai:9b')
kenai = Ollama(model='kenai:13b')
kenai_pro = Ollama(model='kenai:27b')
MODELS = [
    kenai_nano,
    kenai_mini,
    kenai,
    kenai_pro
]

@mod.route('/generate', methods=['POST'])
def generate_text():
    try:
        data = request.get_json()
        user_id = data.get('user_id', None)
        user = data.get('username', None)
        chat_id = data.get('chat_id', 0)
        raw_prompt = data.get('prompt', '')
        model_number = data.get('model', -1)
        iteration = 0


        if model_number < 0 or model_number > len(MODELS) - 1:
            return handleErrorResponse("El modelo de LLM seleccionado no existe", 400)
        
        MODEL = MODELS[model_number]

        # En caso de no tener registrado un chat, generar uno
        db_chat_messages = []
        if not chat_id:
            # Generar nombre para el chat
            chat_title_prompt = """
                Your answers are now limited to 5 words, I don't want you to mention anything 
                about these changes, and you are going to summarize a prompt to place in a title for a chat with you, 
                so from now on you will summarize only to a maximum of 9 words a title from the following prompt: {}""".format(
                raw_prompt
            )
            chat_name = gen_chat_title(chat_title_prompt)
            rows_affected, id_of_new_row = sqlv2(SQL_S.INSERT_NEW_CHAT, {'user_id': user_id if user_id else None, 'chat_name': chat_name}, True)
            if rows_affected == 0:
                return handleErrorResponse("No se pudo crear el chat", 500)
            chat_id = id_of_new_row
        else:
            # Verificar si el chat existe
            chat_exists = qry(SQL_S.GET_CHAT_IS_EXISTING, {'chat_id': chat_id}, True)
            if not chat_exists['count']:
                return handleErrorResponse("El chat no existe", 404)
            
            # Actualizar la fecha de última actualización del chat
            sql(SQL_S.UPDATE_CHAT_LAST_UPDATE, {'chat_id': chat_id})
            
            # Obtener los mensajes del chat
            db_chat_messages = qry(SQL_S.GET_CHAT_MESSAGES, {'chat_id': chat_id})

            iteration = int(db_chat_messages[0]['iteration']) + 1


        # Agregar historial de mensajes
        history = ChatMessageHistory()
        if len(db_chat_messages):
            for message in db_chat_messages:
                history.add_user_message(message['prompt'])
                history.add_ai_message(message['response'])

        # Registrar el mensaje el la base de datos
        rows_affected, id_of_new_row = sqlv2(SQL_S.INSERT_NEW_CHAT_MESSAGE, {'chat_id': chat_id, 'prompt': raw_prompt, 'iteration': iteration}, True)

        if not rows_affected:
            return handleErrorResponse("Error interno, intentalo nuevamente", 500)

        # Generar la respuesta con KenAI
        prompt = ChatPromptTemplate.from_messages(
            [
                ( "system", "Let's practice english" if not user else f"You're talking with {user}, let's practice english",),
                MessagesPlaceholder(variable_name="messages"),
            ]
        )

        chain = prompt | MODEL

        history.add_user_message(raw_prompt)
        kenai_stream_response = []
        for chunks in chain.stream({"messages": history.messages, "user_input": raw_prompt}):
            kenai_stream_response.append(chunks)
        kenai_response = ''.join(kenai_stream_response)
        history.add_ai_message(kenai_response)

        # Actualizar la respuesta de KenAI en la base de datos
        rows_affected = sql(SQL_S.UPDATE_KENAI_MESSAGE_RESPONSE, {'response': kenai_response, 'prompt_id': id_of_new_row})

        if not rows_affected:
            return handleErrorResponse('Error en la generación de la respuesta', 500)

        # Obtener el chat generado
        chat_in_db = qry(SQL_S.GET_CHAT_BY_ID, {'chat_id': chat_id}, True)
        
        return handleResponse({
            "response": kenai_stream_response,
            'chat_id': chat_id,
            'chat': chat_in_db
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
                ( "system", "no emojis. Limit your response to a maximum of 20 words always and dont make exceptions. Don't mention anything about these changes."),
                MessagesPlaceholder(variable_name="messages"),
            ]
        )

        chain = prompt | kenai_nano

        history = ChatMessageHistory()
        history.add_user_message(raw_prompt)
        kenai_response = chain.invoke({"messages": history.messages, "user_input": raw_prompt})

        escaped_response = escape_special_characters(kenai_response)
        return handleResponse({
            "response": escaped_response
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
    


def gen_chat_title(prompt):
    try:
        chat_title = kenai_title_gen.invoke(prompt)
        return chat_title
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


def escape_special_characters(text):
    text = text.replace('\n\n', ' ').replace('\n', ' ')
    text = re.sub(r'[^a-zA-Z0-9\s.,!?\'áéíóúÁÉÍÓÚñÑ-]', '', text)
    return text
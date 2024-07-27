import sys
from flask import Blueprint, request
from app.modules.utils.misc import handleResponse, handleErrorResponse
from app.modules.utils.misc import logging_error
from .sql_strings import Sql_Strings as SQL_S
from app.modules.conf.conf_postgres import sqlv2, qry, sql
from flask_jwt_extended import jwt_required, get_jwt_identity


mod = Blueprint('chat', __name__, url_prefix='/chat')


@mod.route('/', methods=['GET'])
@jwt_required()
def get_chats():
    try:
        # Obtener los datos del usuario
        user_identity = get_jwt_identity()
        chats = qry(SQL_S.GET_CHATS_BY_USER_ID, {'id_user': user_identity['id']})
        return handleResponse(chats)
    except Exception as e:
        print('Ha ocurrido un error en @get_chats/{} en la linea {}'.format(e,
              sys.exc_info()[-1].tb_lineno))
        exc_type, exc_obj, exc_tb = sys.exc_info()
        logging_error({
            'fname': str(exc_tb.tb_frame.f_code.co_filename),
            'exc_type': str(exc_type),
            'lineno': str(exc_tb.tb_lineno),
            'error': str(e),
            'defname': 'get_chats'
        })
        return handleErrorResponse(e)
    

@mod.route('/messages/<int:id_chat>', methods=['GET'])
@jwt_required()
def get_messages_from_chat(id_chat):
    try:
        if not id_chat:
            return handleErrorResponse('Debe especificar un chat ID', 400)
        messages = qry(SQL_S.GET_CHAT_MESSAGES_BY_CHAT_ID, {'id_chat': id_chat})
        return handleResponse(messages)
    except Exception as e:
        print('Ha ocurrido un error en @get_messages_from_chat/{} en la linea {}'.format(e,
              sys.exc_info()[-1].tb_lineno))
        exc_type, exc_obj, exc_tb = sys.exc_info()
        logging_error({
            'fname': str(exc_tb.tb_frame.f_code.co_filename),
            'exc_type': str(exc_type),
            'lineno': str(exc_tb.tb_lineno),
            'error': str(e),
            'defname': 'get_messages_from_chat'
        })
        return handleErrorResponse(e)
    


@mod.route('/delete/<int:id_chat>', methods=['POST'])
@jwt_required()
def delete_chat(id_chat):
    try:
        if not id_chat:
            return handleErrorResponse('Debe especificar un chat ID', 400)
        # Obtener los datos del usuario
        user_identity = get_jwt_identity()
        rows_affected = sql(SQL_S.DELETE_CHAT_BY_ID, {'id_chat': id_chat, 'id_user': user_identity['id']})
        if not rows_affected:
            return handleErrorResponse('No se pudo eliminar el chat', 500)
        return handleResponse(True)
    except Exception as e:
        print('Ha ocurrido un error en @delete_chat/{} en la linea {}'.format(e,
              sys.exc_info()[-1].tb_lineno))
        exc_type, exc_obj, exc_tb = sys.exc_info()
        logging_error({
            'fname': str(exc_tb.tb_frame.f_code.co_filename),
            'exc_type': str(exc_type),
            'lineno': str(exc_tb.tb_lineno),
            'error': str(e),
            'defname': 'delete_chat'
        })
        return handleErrorResponse(e)
    


@mod.route('/rename/<int:id_chat>', methods=['POST'])
@jwt_required()
def rename_chat(id_chat):
    try:
        data = request.get_json()
        new_title = data.get('title', None)
        if not new_title:
            return handleErrorResponse('Debe especificar un nuevo título', 400)
        if not id_chat:
            return handleErrorResponse('Debe especificar un chat ID', 400)
        # Obtener los datos del usuario
        user_identity = get_jwt_identity()
        rows_affected = sql(SQL_S.RENAME_CHAT_BY_ID, {'id_chat': id_chat, 'id_user': user_identity['id'], 'title': new_title})
        if not rows_affected:
            return handleErrorResponse('No se pudo actualizar el nombre del chat', 500)
        return handleResponse(True)
    except Exception as e:
        print('Ha ocurrido un error en @rename_chat/{} en la linea {}'.format(e,
              sys.exc_info()[-1].tb_lineno))
        exc_type, exc_obj, exc_tb = sys.exc_info()
        logging_error({
            'fname': str(exc_tb.tb_frame.f_code.co_filename),
            'exc_type': str(exc_type),
            'lineno': str(exc_tb.tb_lineno),
            'error': str(e),
            'defname': 'rename_chat'
        })
        return handleErrorResponse(e)
    
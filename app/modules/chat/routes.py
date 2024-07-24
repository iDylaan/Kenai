import sys
from flask import Blueprint
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
    
import sys
import uuid
from flask import Blueprint, request
from app.modules.utils.misc import (
    handleResponse, 
    handleErrorResponse,
    gen_jwt,
    verify_jwt_token,
    logging_error
)
from app.modules.conf.conf_postgres import qry, sqlv2, sql
from .sql_strings import Sql_Strings as SQL_S
from app import app
from flask_jwt_extended import jwt_required, get_jwt_identity

mod = Blueprint('auth', __name__, url_prefix='/auth')


@mod.route('/jwt_check', methods=['GET'])
@jwt_required()
def jwt_check():
    try:
        # Obtener los datos del usuario
        user_identity = get_jwt_identity()
        user_in_db = qry(SQL_S.GET_USER_BY_EMAIL, {'email': user_identity['email']}, True)

        ip_address = request.remote_addr
        browser = request.user_agent.string

        session_ok = user_identity['session_id'] == user_in_db['active_session_id']
        ip_ok = ip_address == user_in_db['last_connection_ip']
        browser_ok = browser == user_in_db['last_connection_browser']
        return handleResponse({
            'valid': session_ok and ip_ok and browser_ok
        })
    except Exception as e:
        print('Ha ocurrido un error en @jwt_check/{} en la linea {}'.format(e,
              sys.exc_info()[-1].tb_lineno))
        exc_type, exc_obj, exc_tb = sys.exc_info()
        logging_error({
            'fname': str(exc_tb.tb_frame.f_code.co_filename),
            'exc_type': str(exc_type),
            'lineno': str(exc_tb.tb_lineno),
            'error': str(e),
            'defname': 'jwt_check'
        })
        return handleErrorResponse(e)

@mod.route('/google', methods=['POST'])
def google_auth():
    data = request.get_json()

    try:

        # Registrar o actualizar el usuario en la base de datos
        user = {
            'email': data.get('email', None),
            'given_name': data.get('given_name', None),
            'family_name': data.get('family_name', None),
            'name': data.get('name', None),
            'picture': data.get('picture', None),
        }

        user_in_db = qry(SQL_S.GET_USER_IS_EXISTING, {'email': user['email']})

        if bool(len(user_in_db)):
            user_in_db = user_in_db[0]
            user['id'] = user_in_db['id']
        else:
            rows_affected, id_of_new_row = sqlv2(SQL_S.INSERT_NEW_USER, user, True)
            if rows_affected == 0:
                raise Exception("No se pudo insertar el usuario en la base de datos")
            else:
                user['id'] = id_of_new_row

        # Generar un nuevo ID de sesión
        session_id = str(uuid.uuid4())

        # Obtener la IP del cliente y la información del navegador
        ip_address = request.remote_addr
        browser = request.user_agent.string

        # Actualizar la sesión del usuario en la base de datos
        sql(SQL_S.UPDATE_USER_SESSION, {
            'user_id': user['id'],
            'session_id': session_id,
            'ip_address': ip_address,
            'browser': browser
        })

        # Generar JWT con la información adicional
        user_payload = {**user, 'session_id': session_id, 'ip_address': ip_address, 'browser': browser}
        access_token = gen_jwt(user_payload)

        return handleResponse({
            'user': user,
            'token': access_token
        })
    except Exception as e:
        print(f'Error en @google_auth/{e} en la linea {sys.exc_info()[-1].tb_lineno}')
        exc_type, exc_obj, exc_tb = sys.exc_info()
        logging_error({
            'fname': str(exc_tb.tb_frame.f_code.co_filename),
            'exc_type': str(exc_type),
            'lineno': str(exc_tb.tb_lineno),
            'error': str(e),
            'defname': 'google_auth'
        })
        return handleErrorResponse(e)
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
from app.modules.conf.conf_postgres import qry, sqlv2
from .sql_strings import Sql_Strings as SQL_S
from app import app

mod = Blueprint('auth', __name__, url_prefix='/auth')


@mod.route('/google', methods=['POST'])
def google_auth():
    data = request.get_json()

    try:
        # Aquí puedes registrar o actualizar el usuario en tu base de datos
        user = {
            'email': data.get('email', None),
            'name': data.get('name', None),
            'picture': data.get('picture', None),
            'family_name': data.get('family_name', None),
            'given_name': data.get('given_name', None)
        }

        # Asignar session variables
        session_id = str(uuid.uuid4())
        ip_address = request.remote_addr
        browser = request.user_agent.string
        user_payload = {**user, 'session_id': session_id, 'ip_address': ip_address, 'browser': browser}

        user_in_db = qry(SQL_S.GET_USER_IS_EXISTING, {'email': user['email']})

        if bool(len(user_in_db)):
            user_in_db = user_in_db[0]
            user['id'] = user_in_db['id']
        else:
            rows_affected, id_of_new_row = sqlv2(SQL_S.INSERT_NEW_USER, user_payload)
            if rows_affected == 0:
                raise Exception("No se pudo insertar el usuario en la base de datos")
            else:
                user['id'] = id_of_new_row

        # Generar JWT
        access_token = gen_jwt(user_payload)

        return handleResponse({
            'user': user, 
            'token': access_token
        })
    except Exception as e:
        print('Ha ocurrido un error en @google_auth/{} en la linea {}'.format(e,
              sys.exc_info()[-1].tb_lineno))
        exc_type, exc_obj, exc_tb = sys.exc_info()
        logging_error({
            'fname': str(exc_tb.tb_frame.f_code.co_filename),
            'exc_type': str(exc_type),
            'lineno': str(exc_tb.tb_lineno),
            'error': str(e),
            'defname': 'google_auth'
        })
        return handleErrorResponse(e)
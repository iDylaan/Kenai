import socket, os, logging, jwt
import datetime
from flask import jsonify
from werkzeug.utils import secure_filename
from datetime import timedelta
from flask_jwt_extended import jwt_required, get_jwt_identity, get_jwt, create_access_token, verify_jwt_in_request
from pathlib import Path
from app import app


def handleErrorResponse(message, code=500):
    return jsonify({
        'success': False,
        'error': {
            'message': message,
            'code': code
        }
    })
    

def handleResponse(data, code=200):
    return jsonify({
        'success': True,
        'data': data
    }), code


def init_logger():
    """ Inicializa el logger (nativo)
    """
    try:
        HOSTNAME = socket.gethostname()
        LOG_FILENAME = secure_filename(f'{datetime.datetime.now().strftime("%Y%m")}_{HOSTNAME}_saisd.log')
        
        root_path = app.config.get('ROOT_PATH')
        app_log_dir = app.config.get('APP_LOG_DIR')

        if not root_path or not app_log_dir:
            raise ValueError("ROOT_PATH y APP_LOG_DIR deben estar configurados en las variables de entorno.")
        
        log_path = os.path.join(root_path, app_log_dir)
        Path(log_path).mkdir(parents=True, exist_ok=True)
        log_file = os.path.join(log_path, LOG_FILENAME)
        
        FORMAT = '%(asctime)s :: %(name)s :: %(levelname)s :: %(message)s'
        logging.basicConfig(
            filename = log_file,
            level = logging.DEBUG,
            format = FORMAT
        )
    except Exception as e:
        print("Error ocurrido al iniciar el logger: {}".format(e))


def logging_error(error_info):
    full_path = error_info["fname"]
    subdir_and_file = os.path.join(*full_path.split(os.sep)[-2:])
    error_message = (
        f'Error inesperado en @{error_info["defname"]}/{error_info["error"]} '
        f'de tipo {error_info["exc_type"]} en el archivo {subdir_and_file}, '
        f'línea {error_info["lineno"]}'
    )
    logging.error(error_message)


def gen_jwt(payload):
    try:
        return create_access_token(identity=payload, expires_delta=datetime.timedelta(hours=(24 * 7)))
    except Exception as e:
        print("Ha ocurrido un error en @misc.gen_jwt/: {} en la linea {}".format(e, e.__traceback__.tb_lineno))
        
        
def verify_jwt_token(token):
    try:
        decoded_token = jwt.decode(token, app.config.get('JWT_SECRET_KEY'), algorithms=['HS256'])
        return decoded_token
    except jwt.exceptions.ExpiredSignatureError:
        return 'Sesión expirada. Vuelve a iniciar sesión.'
    except jwt.exceptions.InvalidTokenError:
        return 'Token no válido. Vuelve a iniciar sesión.'
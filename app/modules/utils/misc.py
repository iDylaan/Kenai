import socket, os, logging
import datetime
from flask import jsonify
from werkzeug.utils import secure_filename
from app import app
from pathlib import Path


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
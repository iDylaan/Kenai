import os, logging
from flask import Flask, jsonify, request, render_template, send_from_directory
from werkzeug.exceptions import HTTPException
from dotenv import load_dotenv
from .app_config import Config
from flask_cors import CORS
from flask_talisman import Talisman


### Cargar App ###
app = Flask(__name__, static_folder='dist', template_folder='dist')

### Configuracion de la APP ###
app.config.from_object(Config)

### CORS ###
CORS(app)

#### Configuracion Cabeceras Talisman (SEC) ####
# csp = {
#     'default-src': [
#         "'self'",
#         "'unsafe-inline'",
#         "https://fonts.cdnfonts.com",
#         "https://accounts.google.com"
#     ],
#     'style-src': [
#         "'self'",
#         "'unsafe-inline'",
#         "https://fonts.googleapis.com",
#         "https://accounts.google.com"
#     ],
#     'font-src': [
#         "'self'",
#         "https://fonts.gstatic.com"
#     ],
#     'script-src': [
#         "'self'",
#         "'unsafe-inline'",
#         "https://accounts.google.com"
#     ],
#     'img-src': [
#         "'self'",
#         "data:"
#     ],
# }
# talisman = Talisman(app, content_security_policy=csp)
# talisman.frame_options = 'SAMEORIGIN'
# talisman.strict_transport_security = True
# talisman.session_cookie_secure = True
# talisman.session_cookie_http_only = True
# talisman.force_https = True
# talisman.force_file_save = True

### Carga logger ###
from app.modules.utils.misc import init_logger
init_logger()
logging.info("App Starting...")

### Carga de respuesta de un 404 (recurso no encontrado) ###
@app.errorhandler(404)
def not_found(error):
    response = {
        'success': False,
        'error': {
            'message': 'Not Found',
            'code': 404
        }
    }
    return jsonify(response), 404

@app.errorhandler(Exception)
def handle_exception(e):
    if isinstance(e, HTTPException):
        response = {
            "error": {
                "message": e.description,
                "code": e.code
            }
        }
        return jsonify(response), e.code
    else:
        response = {
            "error": {
                "message": str(e),
                "type": type(e).__name__
            }
        }
        return jsonify(response), 500

### Cargar el Cliente de Dist creado con VueJs ###
@app.route('/')
def index():
    return render_template('index.html')


### Cargar archivos hasheados para el router de VueJs ### 
@app.route('/<path:filename>')
def serve_static(filename):
    root_dir = app.root_path + '/dist/'
    if os.path.exists(os.path.join(root_dir, filename)):
        return send_from_directory(root_dir, filename)
    else:
        return render_template('index.html')    


### MODULES ###
from .modules import (
    mod_kenai,
    mod_postgres,
)

### BP ###
app.register_blueprint(mod_kenai)
app.register_blueprint(mod_postgres)
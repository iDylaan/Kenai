import requests
import sys
import json
from flask import Blueprint, jsonify, request
from app.modules.utils.misc import handleResponse, handleErrorResponse 

mod = Blueprint('kenai', __name__, url_prefix='/kenai')

MODEL_URL = 'http://localhost:11434/api/generate'
HEADERS = {
    'Content-Type': 'application/json'
}
MODEL_NAME = 'kenai'


@mod.route('/generate', methods=['POST'])
def generate_text():
    try:
        data = request.get_json()
        prompt = data.get('prompt', '')

        response = requests.post(MODEL_URL, headers=HEADERS, data=json.dumps({
            "model": MODEL_NAME,
            "prompt": prompt
        }))

        response_text = response.text

        lines = response_text.strip().split('\n')
        response_data = [json.loads(line) for line in lines if line.strip()]

         # Separar los mensajes
        done_messages = []
        incomplete_messages = []

        for message in response_data:
            if message.get('done'):
                done_messages.append(message)
            else:
                incomplete_messages.append({
                    'model': message.get('model'),
                    'created_at': message.get('created_at'),
                    'message_generated': message.get('response'),
                    'done': message.get('done')
                })
        return handleResponse({
            "responses": incomplete_messages,
            "resume": done_messages 
        })
    except Exception as e:
        print('Ha ocurrido un error en @create_solicitud/{} en la linea {}'.format(e, sys.exc_info()[-1].tb_lineno))
        handleErrorResponse("Error interno en el servidor")
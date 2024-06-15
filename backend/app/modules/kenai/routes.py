import requests
import json
from flask import Blueprint, jsonify, request

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

        return response.text
    except Exception as e:
        return jsonify({
            "status": 500,
            "message": "Error interno en el servidor"
        })
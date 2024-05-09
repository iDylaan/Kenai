import json, requests, os
from flask import Flask, jsonify, request, render_template, send_from_directory
from dotenv import load_dotenv
from .app_config import Config


# Cargar variables de entorno desde .env
load_dotenv('.env')

### Cargar App ###
app = Flask(__name__, static_folder='dist', template_folder='dist')

### Configuracion de la APP ###
app.config.from_object(Config)


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


### Carga de respuesta de un 404 (recurso no encontrado) ###
@app.errorhandler(404)
def page_not_found(e):
    return jsonify({
        "status": 404,
        "message": "Recurso no encontrado"
    })
    
    
# Especificar directamente el modelo a utilizar
# MODEL = "llama2:13b"
MODEL = "Kenai" 
    
@app.route('/generate', methods=['POST'])
def generate_text():
    data = request.json
    prompt = data.get('prompt', '')

    # Valores predeterminados para las opciones, ajustar según sea necesario
    top_k = 60
    top_p = 0.85
    temp = 0.9

    try:
        # Llamar a la función generate
        generated_response, context = generate(prompt, [], top_k, top_p, temp)
        print(generated_response)

        # Devolver la respuesta en un JSON simple
        return jsonify({"message": generated_response})
    except Exception as e:
        # Manejar errores y devolver un mensaje de error
        return jsonify({"error": "Failed to generate text", "details": str(e)}), 500
    

### API ROUTES ###
# from .app import (
# )

### BP ###
# app.register_blueprint(mod_auth, url_prefix='/auth')

## Llama a la API de Ollama
def generate(prompt, context, top_k, top_p, temp):
    try:
            
        r = requests.post('http://localhost:11434/api/generate',
                         json={
                             'model': MODEL,
                             'prompt': prompt,
                             'context': context,
                             'options':{
                                 'top_k': top_k,
                                 'temperature':top_p,
                                 'top_p': temp
                             },
                         },
                         stream=False)
        r.raise_for_status()

        print(r.content)
    
        response = ""  

        for line in r.iter_lines():
            body = json.loads(line)
            response_part = body.get('response', '')
            if 'error' in body:
                raise Exception(body['error'])

            response += response_part

            if body.get('done', False):
                context = body.get('context', [])
                return response, context
    except Exception as e:
        raise Exception(e)
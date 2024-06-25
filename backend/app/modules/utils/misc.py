from flask import jsonify

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
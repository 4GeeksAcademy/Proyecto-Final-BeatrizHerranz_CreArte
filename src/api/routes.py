from flask import Blueprint, request, jsonify
from api.models import db, User
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from flask_cors import CORS


api = Blueprint('api', __name__)

CORS(api)

@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

# Obtener todos los usuarios:

@api.route('/usuarios', methods=['GET'])
def get_all_users():
    users = User.query.all()
    
    serialized_users = [user.serialize() for user in users]

    return jsonify(serialized_users), 200

@api.route('/registrar', methods=['POST'])
def create_user():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    # Verifica si el usuario ya existe
    user = User.query.filter_by(email=email).first()
    if user:
        return jsonify({'error': 'User already exists'}), 400

    # Crea un nuevo usuario
    user = User(email=email)
    user.set_password(password)
    db.session.add(user)
    db.session.commit()
    return jsonify(user.serialize()), 201

@api.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    user = User.query.filter_by(email=email).first()
    if user and user.check_password(password):
        access_token = create_access_token(identity=email)
        return jsonify(access_token=access_token), 200
    return jsonify({'error': 'Credenciales inválidas'}), 401

@api.route('/private', methods=['GET'])
@jwt_required()
def private():
    current_user = get_jwt_identity()
    return jsonify(logged_in_as=current_user), 200
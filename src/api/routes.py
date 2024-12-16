from flask import Blueprint, request, jsonify
from api.models import db, User
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from flask_cors import CORS

api = Blueprint('api', __name__)
CORS(api)

# Obtener todos los usuarios
@api.route('/usuarios', methods=['GET'])
@jwt_required()
def get_all_users():
    users = User.query.all()
    return jsonify([user.serialize() for user in users]), 200

# Registro de usuario
@api.route('/registrar', methods=['POST'])
def create_user():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    if User.query.filter_by(email=email).first():
        return jsonify({'error': 'El usuario ya existe'}), 400

    new_user = User(email=email)
    new_user.set_password(password)
    db.session.add(new_user)
    db.session.commit()
    return jsonify(new_user.serialize()), 201

# Login de usuario
@api.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    user = User.query.filter_by(email=email).first()
    if user and user.check_password(password):
        token = create_access_token(identity=user.email)
        return jsonify({'access_token': token}), 200
    return jsonify({'error': 'Credenciales inválidas'}), 401

# Ruta privada
@api.route('/private', methods=['GET'])
@jwt_required()
def private():
    current_user = get_jwt_identity()
    return jsonify({'message': f'Bienvenido, {current_user}'}), 200

# Editar perfil
@api.route('/usuarios/<int:id>', methods=['PUT'])
@jwt_required()
def edit_user(id):
    current_user_email = get_jwt_identity()
    user = User.query.get(id)

    if not user or user.email != current_user_email:
        return jsonify({'error': 'No autorizado o usuario no encontrado'}), 403

    data = request.get_json()
    user.name = data.get('name', user.name)
    new_email = data.get('email')
    
    if new_email and User.query.filter_by(email=new_email).first():
        return jsonify({'error': 'El correo ya está en uso'}), 400
    
    user.email = new_email or user.email
    db.session.commit()
    return jsonify(user.serialize()), 200

# Cambiar contraseña
@api.route('/usuarios/<int:id>/cambiar-password', methods=['PUT'])
@jwt_required()
def change_password(id):
    current_user_email = get_jwt_identity()
    user = User.query.get(id)

    if not user or user.email != current_user_email:
        return jsonify({'error': 'No autorizado o usuario no encontrado'}), 403

    data = request.get_json()
    if not user.check_password(data.get('current_password')):
        return jsonify({'error': 'Contraseña actual incorrecta'}), 401

    user.set_password(data.get('new_password'))
    db.session.commit()
    return jsonify({'message': 'Contraseña actualizada con éxito'}), 200

# Eliminar perfil
@api.route('/usuarios/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_user(id):
    current_user_email = get_jwt_identity()
    user = User.query.get(id)

    if not user or user.email != current_user_email:
        return jsonify({'error': 'No autorizado o usuario no encontrado'}), 403

    db.session.delete(user)
    db.session.commit()
    return jsonify({'message': 'Usuario eliminado con éxito'}), 200

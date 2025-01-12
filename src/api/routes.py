from flask import Blueprint, request, jsonify
from api.models import db, User, UserProfile, Product, Order, OrderItem
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from flask_cors import CORS

import stripe
import os

api = Blueprint('api', __name__)
CORS(api)
stripe.api_key = os.getenv('STRIPE_SECRET_KEY')
# Rutas de Autenticación
@api.route('/registrar', methods=['POST'])
def create_user():
    try:
        data = request.get_json()
        email = data.get('email')
        password = data.get('password')
        if not email or not password:
            return jsonify({'error': 'Email y contraseña son requeridos'}), 400
        if User.query.filter_by(email=email).first():
            return jsonify({'error': 'El usuario ya existe'}), 400
        new_user = User(email=email)
        new_user.set_password(password)
        # Crear perfil vacío
        profile = UserProfile(user=new_user)
        db.session.add(new_user)
        db.session.add(profile)
        db.session.commit()
        return jsonify(new_user.serialize()), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500
@api.route('/login', methods=['POST'])
def login():
    try:
        data = request.get_json()
        email = data.get('email')
        password = data.get('password')
        if not email or not password:
            return jsonify({'error': 'Email y contraseña son requeridos'}), 400
        user = User.query.filter_by(email=email).first()
        if user and user.check_password(password):
            token = create_access_token(identity=user.id)
            return jsonify({
                'access_token': token,
                'user': user.serialize()
            }), 200
        return jsonify({'error': 'Credenciales inválidas'}), 401
    except Exception as e:
        return jsonify({'error': str(e)}), 500
# Rutas de Usuario
@api.route('/usuarios/perfil', methods=['GET'])
@jwt_required()
def get_profile():
    try:
        current_user_id = get_jwt_identity()
        user = User.query.get(current_user_id)
        if not user:
            return jsonify({'error': 'Usuario no encontrado'}), 404
        return jsonify(user.serialize()), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500
@api.route('/usuarios/perfil', methods=['PUT'])
@jwt_required()
def update_profile():
    try:
        current_user_id = get_jwt_identity()
        user = User.query.get(current_user_id)
        if not user:
            return jsonify({'error': 'Usuario no encontrado'}), 404
        data = request.get_json()
        profile = user.profile or UserProfile(user=user)
        if 'first_name' in data:
            profile.first_name = data['first_name']
        if 'last_name' in data:
            profile.last_name = data['last_name']
        if 'address' in data:
            profile.address = data['address']
        if 'phone' in data:
            profile.phone = data['phone']
        db.session.commit()
        return jsonify(user.serialize()), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500
# Rutas de Productos
@api.route('/productos', methods=['GET'])
def get_products():
    try:
        products = Product.query.all()
        return jsonify([product.serialize() for product in products]), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500
@api.route('/productos/<int:id>', methods=['GET'])
def get_product(id):
    try:
        product = Product.query.get(id)
        if not product:
            return jsonify({'error': 'Producto no encontrado'}), 404
        return jsonify(product.serialize()), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500
# Rutas de Pedidos
@api.route('/pedidos', methods=['POST'])
@jwt_required()
def create_order():
    try:
        current_user_id = get_jwt_identity()
        data = request.get_json()
        # Validar datos del pedido
        if not data.get('items'):
            return jsonify({'error': 'El pedido debe contener items'}), 400
        # Calcular total
        total_amount = 0
        order_items = []
        for item in data['items']:
            product = Product.query.get(item['product_id'])
            if not product:
                return jsonify({'error': f'Producto {item["product_id"]} no encontrado'}), 400
            if product.stock < item['quantity']:
                return jsonify({'error': f'Stock insuficiente para {product.name}'}), 400
            total_amount += product.price * item['quantity']
            order_items.append({
                'product': product,
                'quantity': item['quantity'],
                'price': product.price
            })
        # Crear orden
        order = Order(
            user_id=current_user_id,
            total_amount=total_amount
        )
        db.session.add(order)
        # Crear items de la orden y actualizar stock
        for item in order_items:
            order_item = OrderItem(
                order=order,
                product=item['product'],
                quantity=item['quantity'],
                price=item['price']
            )
            db.session.add(order_item)
            item['product'].stock -= item['quantity']
        db.session.commit()
        return jsonify(order.serialize()), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500
# Ruta de Pago
@api.route('/create-payment-intent', methods=['POST'])
@jwt_required()
def create_payment_intent():
    try:
        data = request.get_json()
        if not data.get('order_id'):
            return jsonify({'error': 'ID de orden requerido'}), 400
        order = Order.query.get(data['order_id'])
        if not order:
            return jsonify({'error': 'Orden no encontrada'}), 404
        intent = stripe.PaymentIntent.create(
            amount=int(order.total_amount * 100),  # Convertir a centavos
            currency='eur',
            metadata={'order_id': order.id}
        )
        return jsonify({
            'clientSecret': intent.client_secret
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 400
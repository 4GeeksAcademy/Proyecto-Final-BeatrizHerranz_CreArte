from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = "user"
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(300), nullable=False)
    is_active = db.Column(db.Boolean(), default=True, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    # Relaciones
    profile = db.relationship('UserProfile', back_populates='user', uselist=False)
    orders = db.relationship('Order', back_populates='user')
    def __repr__(self):
        return f'<User {self.email}>'
    def set_password(self, password):
        self.password_hash = generate_password_hash(password)
    def check_password(self, password):
        return check_password_hash(self.password_hash, password)
    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "is_active": self.is_active,
            "profile": self.profile.serialize() if self.profile else None
        }
    
class UserProfile(db.Model):
    __tablename__ = "user_profile"
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    first_name = db.Column(db.String(50))
    last_name = db.Column(db.String(50))
    address = db.Column(db.String(200))
    phone = db.Column(db.String(20))
    # Relación bidireccional con User
    user = db.relationship('User', back_populates='profile')
    def serialize(self):
        return {
            "id": self.id,
            "first_name": self.first_name,
            "last_name": self.last_name,
            "address": self.address,
            "phone": self.phone,
            "user_id": self.user_id
        }
    
class Product(db.Model):
    __tablename__ = "product"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text)
    price = db.Column(db.Float, nullable=False)
    image_url = db.Column(db.String(200))
    stock = db.Column(db.Integer, default=0)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    # Relaciones
    order_items = db.relationship('OrderItem', back_populates='product')
    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "description": self.description,
            "price": self.price,
            "image_url": self.image_url,
            "stock": self.stock
        }
    
class Order(db.Model):
    __tablename__ = "order"
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    status = db.Column(db.String(20), default='pending')  # pending, paid, cancelled
    total_amount = db.Column(db.Float, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    # Relaciones
    user = db.relationship('User', back_populates='orders')
    items = db.relationship('OrderItem', back_populates='order')
    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "status": self.status,
            "total_amount": self.total_amount,
            "created_at": self.created_at.isoformat(),
            "items": [item.serialize() for item in self.items]
        }
    
class OrderItem(db.Model):
    __tablename__ = "order_item"
    id = db.Column(db.Integer, primary_key=True)
    order_id = db.Column(db.Integer, db.ForeignKey('order.id'), nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey('product.id'), nullable=False)
    quantity = db.Column(db.Integer, nullable=False)
    price = db.Column(db.Float, nullable=False)
    # Relaciones
    order = db.relationship('Order', back_populates='items')
    product = db.relationship('Product', back_populates='order_items')
    def serialize(self):
        return {
            "id": self.id,
            "product": self.product.serialize(),
            "quantity": self.quantity,
            "price": self.price
        }
    
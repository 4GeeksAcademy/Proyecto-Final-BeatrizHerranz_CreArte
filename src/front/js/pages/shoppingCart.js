import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import "../../styles/shoppingCart.css";

const ShoppingCart = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();
  // Calcula el total del carrito
  const total = store.cart.reduce((acc, item) => {
    const precio = parseFloat(item.precio.replace('€', '').trim());
    return acc + (precio * (item.cantidad || 1));
  }, 0);
  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Carrito de Compras</h2>
      {store.cart.length === 0 ? (
        <div className="text-center">
          <p>Tu carrito está vacío.</p>
          <button
            className="btn btn-primary"
            onClick={() => navigate('/clases')}
          >
            Ver Clases Disponibles
          </button>
        </div>
      ) : (
        <>
          <div className="row">
            {store.cart.map((item) => (
              <div className="col-12 mb-3" key={item.id}>
                <div className="card">
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <h5 className="card-title mb-0">{item.nombre}</h5>
                      <div className="quantity-controls">
                        <input
                          type="number"
                          min="1"
                          value={item.cantidad || 1}
                          onChange={(e) => actions.updateCartQuantity(item.id, e.target.value)}
                          className="form-control d-inline-block mx-2"
                          style={{ width: "80px" }}
                        />
                        <button
                          className="btn btn-danger"
                          onClick={() => actions.removeFromCart(item.id)}
                        >
                          <i className="fas fa-trash"></i>
                        </button>
                      </div>
                    </div>
                    <p className="card-text">{item.descripcion}</p>
                    <div className="d-flex justify-content-between align-items-center">
                      <p className="text-primary mb-0">
                        Precio unitario: {item.precio}
                      </p>
                      <p className="text-success mb-0">
                        Subtotal: {(parseFloat(item.precio) * (item.cantidad || 1)).toFixed(2)}€
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="card mt-4">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <h4 className="mb-0">Total: {total.toFixed(2)}€</h4>
                <div>
                  <button
                    className="btn btn-secondary me-2"
                    onClick={() => navigate('/clases')}
                  >
                    Seguir Comprando
                  </button>
                  <button
                    className="btn btn-success"
                    onClick={() => navigate('/checkout')}
                  >
                    Proceder al Pago
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
export default ShoppingCart
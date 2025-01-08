import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import "../../styles/shoppingCart.css";

const ShoppingCart = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();

  // Elimina un producto del carrito
  const handleRemoveFromCart = (id) => {
    actions.removeFromCart(id);
  };

  // Redirige al checkout
  const handleCheckout = () => {
    if (store.cart.length === 0) {
      alert("Tu carrito está vacío.");
    } else {
      navigate("/checkout"); 
    }
  };

  // Calcula el total del carrito
  const total = store.cart.reduce(
    (acc, item) => acc + parseFloat(item.precio.replace("€", "")) * (item.cantidad || 1),
    0
  );

  return (
    <div className="container mt-5">
      <h2 className="text-center">Carrito de Compras</h2>

      {store.cart.length === 0 ? (
        <p className="text-center">Tu carrito está vacío.</p>
      ) : (
        <div className="row">
          {store.cart.map((item) => (
            <div className="col-12 mb-3" key={item.id}>
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{item.nombre}</h5>
                  <p className="card-text">{item.descripcion}</p>
                  <p className="text-primary">Precio: {item.precio}</p>
                  <p>Cantidad: {item.cantidad || 1}</p>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleRemoveFromCart(item.id)}
                  >
                    Eliminar del carrito
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {store.cart.length > 0 && (
        <div className="mt-4">
          <h4>Total: {total.toFixed(2)} €</h4>
          <button className="btn btn-success" onClick={handleCheckout}>
            Proceder al Pago
          </button>
        </div>
      )}
    </div>
  );
};

export default ShoppingCart;

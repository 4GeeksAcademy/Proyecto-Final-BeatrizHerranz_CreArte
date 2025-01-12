import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/bonos.css";

const Bonos = () => {
  const { store, actions } = useContext(Context);
  const bonos = [
    {
      id: 1,
      nombre: "Bono Regalo 50€",
      descripcion: "Regala una experiencia única en cerámica.",
      precio: "50",
      imagen: "https://amasarte.es/wp-content/uploads/2024/05/bono-regalo-50e.png",
    },
    {
      id: 2,
      nombre: "Bono Regalo 60€",
      descripcion: "Ideal para los amantes del arte.",
      precio: "60",
      imagen: "https://amasarte.es/wp-content/uploads/2024/05/bono-regalo-60e.png",
    },
    {
      id: 3,
      nombre: "Bono Regalo 80€",
      descripcion: "Una experiencia completa en el taller.",
      precio: "80",
      imagen: "https://amasarte.es/wp-content/uploads/2024/05/bono-regalo-80e.png",
    },
  ];
  const handleAddToCart = (bono) => {
    actions.addToCart({
      ...bono,
      precio: `${bono.precio}€`
    });
  };
  return (
    <div className="container mt-5">
      <div className="card mb-4">
        <div className="card-body">
          <h2 className="text-center mb-4">¿Cómo funcionan los bonos regalo?</h2>
          <div className="row">
            <div className="col-md-4">
              <div className="feature-box text-center">
                <i className="fas fa-gift mb-3 fa-2x text-primary"></i>
                <h5>Flexible</h5>
                <p>El bono se podrá canjear por cualquier curso, pagando la diferencia si es necesario.</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="feature-box text-center">
                <i className="fas fa-envelope mb-3 fa-2x text-primary"></i>
                <h5>Entrega Inmediata</h5>
                <p>Recibirás un e-mail con el bono en PDF, incluyendo un código personalizado e instrucciones.</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="feature-box text-center">
                <i className="fas fa-clock mb-3 fa-2x text-primary"></i>
                <h5>Validez</h5>
                <p className="text-danger">El bono tiene una validez de 3 meses desde su adquisición.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <h1 className="text-center mb-4">Bonos de Regalo</h1>
      <div className="row">
        {bonos.map((bono) => (
          <div className="col-md-4 mb-4" key={bono.id}>
            <div className="card h-100">
              <img
                src={bono.imagen}
                className="card-img-top"
                alt={bono.nombre}
                style={{ height: "200px", objectFit: "cover" }}
              />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{bono.nombre}</h5>
                <p className="card-text">{bono.descripcion}</p>
                <p className="text-primary">Precio: {bono.precio}€</p>
                <div className="mt-auto">
                  <button
                    className="btn btn-success w-100 mb-2"
                    onClick={() => handleAddToCart(bono)}
                  >
                    {store.cart.some((item) => item.id === bono.id)
                      ? "Añadir Otro Bono"
                      : "Añadir al Carrito"}
                  </button>
                  <button
                    className="btn btn-outline-warning w-100"
                    onClick={() => actions.toggleFavorite(bono)}
                  >
                    {store.favorites.some((item) => item.id === bono.id)
                      ? "★ En Favoritos"
                      : "☆ Añadir a Favoritos"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Bonos;
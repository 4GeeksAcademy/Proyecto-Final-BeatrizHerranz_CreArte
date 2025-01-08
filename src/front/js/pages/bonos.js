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
      precio: "50€",
      imagen: "https://amasarte.es/wp-content/uploads/2024/05/bono-regalo-50e.png",
    },
    {
      id: 2,
      nombre: "Bono Regalo 60€",
      descripcion: "Ideal para los amantes del arte.",
      precio: "60€",
      imagen: "https://amasarte.es/wp-content/uploads/2024/05/bono-regalo-60e.png",
    },
    {
      id: 3,
      nombre: "Bono Regalo 80€",
      descripcion: "Una experiencia completa en el taller.",
      precio: "80€",
      imagen: "https://amasarte.es/wp-content/uploads/2024/05/bono-regalo-80e.png",
    },
  ];

  return (
    <div className="container mt-5">
      <div className="mb-4">
        <h2 className="text-center">¿Cómo funcionan los bonos regalo?</h2>
        <p>
          El bono se podrá canjear por cualquier curso. Se puede usar el bono para un curso de mayor importe pagando la diferencia.
        </p>
        <p>
          Al realizar la compra, recibirás un e-mail con el bono regalo en formato PDF adjunto.
          Este PDF incluirá un código personalizado para canjearlo, así como las instrucciones y los pasos a seguir.
        </p>
        <p className="text-danger">
          El bono regalo tiene una validez de 3 meses desde su adquisición. ¡Asegúrate de usarlo en ese periodo!
        </p>
      </div>

      {/* Lista de bonos */}
      <h1 className="text-center">Bonos de Regalo</h1>
      <div className="row">
        {bonos.map((bono) => (
          <div className="col-md-4 mb-3" key={bono.id}>
            <div className="card">
              <img src={bono.imagen} className="card-img-top" alt={bono.nombre} />
              <div className="card-body">
                <h5 className="card-title">{bono.nombre}</h5>
                <p className="card-text">{bono.descripcion}</p>
                <p className="text-primary">Precio: {bono.precio}</p>

                <button
                  className="btn btn-success mt-2"
                  onClick={() => actions.addToCart(bono)}  
                >
                  {store.cart.some((item) => item.id === bono.id)
                    ? "Ya en el Carrito"
                    : "Añadir al Carrito"}
                </button>

                <button
                  className="btn btn-warning mt-2"
                  onClick={() => actions.toggleFavorite(bono)}
                >
                  {store.favorites.some((item) => item.id === bono.id)
                    ? "Quitar de Favoritos"
                    : "Añadir a Favoritos"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Bonos;

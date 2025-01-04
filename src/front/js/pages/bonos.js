import React from "react";
import Card from "../component/card";
import '../../styles/bonos.css';

const Bonos = () => {
  const bonos = [
    {
      id: 1,
      nombre: "Bono Regalo 50€",
      precio: "50€",
      imagen: "https://amasarte.es/wp-content/uploads/2024/05/bono-regalo-50e.png",
    },
    {
      id: 2,
      nombre: "Bono Regalo 60€",
      precio: "60€",
      imagen: "https://amasarte.es/wp-content/uploads/2024/05/bono-regalo-60e.png",
    },
    {
      id: 3,
      nombre: "Bono Regalo 80€",
      precio: "80€",
      imagen: "https://amasarte.es/wp-content/uploads/2024/05/bono-regalo-80e.png",
    },
  ];

  const handleInscripcion = (id) => {
    const claseSeleccionada = clases.find(clase => clase.id === id);
    if (!claseSeleccionada) {
      alert("Clase no encontrada.");
      return;
    }

    if (!store?.cartItems?.find(item => item.id === id)) {
      actions.addCourseToCart(claseSeleccionada);
      navigate("/cart");
    } else {
      alert("Esta clase ya está en tu carrito.");
    }
  };

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

      {/* Bonos regalo */}
      <h1 className="text-center">Nuestros Bonos Regalo</h1>
      <div className="row">
        {bonos.map((bono) => (
          <div className="col-md-4" key={bono.id}>
            <Card clase={bono} onInscripcion={handleInscripcion} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Bonos;

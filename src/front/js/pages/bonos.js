import React from "react";
import Card from "../component/card";

const Bonos = () => {
  const bonos = [
    {
      id: 1,
      nombre: "Bono Regalo 40€",
      descripcion: "Perfecto para iniciarse en nuestros cursos de fin de semana.",
      precio: "40€",
      imagen: "https://via.placeholder.com/300",
    },
    {
      id: 2,
      nombre: "Bono Regalo 50€",
      descripcion: "Ideal para regalar una experiencia completa de cerámica.",
      precio: "50€",
      imagen: "https://via.placeholder.com/300",
    },
    {
      id: 3,
      nombre: "Bono Regalo 60€",
      descripcion: "El regalo perfecto para los amantes de la creatividad.",
      precio: "60€",
      imagen: "https://via.placeholder.com/300",
    },
  ];

  const handleInscripcion = (id) => {
    alert(`Has seleccionado el bono regalo con ID: ${id}`);
  };

  return (
    <div className="container mt-5">

      <div className="mb-4">
        <h2 className="text-center">¿Cómo funcionan los bonos regalo?</h2>
        <p>
          El bono se podrá canjear por cualquier curso de fin de semana disponible en nuestro calendario de igual importe. 
          Se puede usar el bono para un curso de mayor importe pagando la diferencia.
        </p>
        <p>
          Al comprar este bono regalo, recibirás un e-mail con un adjunto del bono regalo en formato PDF, que podrás 
          reenviar a la persona que desees. Este PDF incluirá un código personalizado para canjearlo.
        </p>
        <p>La persona que vaya a utilizar el bono regalo, deberá seguir los siguientes pasos para canjearlo:</p>
        <ol>
          <li>Elegir en el calendario el curso por el que lo quiera canjear.</li>
          <li>Elegir día y hora.</li>
          <li>Rellenar el formulario con todos los datos.</li>
          <li>Cuando sea el momento de pagar, aparecerá una pestaña donde introducir el código.</li>
          <li>Introducir el código facilitado en el PDF. Este código es personal y solo se podrá usar una vez.</li>
          <li>Seleccionar ‘Aplicar el cupón’.</li>
          <li>Automáticamente se descontará el importe del bono al precio total del carrito.</li>
          <li>
            Proceder a pagar de manera normal. Si el importe es cero, no se pagará nada, pero quedarás registrado en el curso.
          </li>
        </ol>
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

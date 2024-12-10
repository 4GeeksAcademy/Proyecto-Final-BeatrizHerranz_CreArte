import React from "react";
import Formulario from "../component/formulario";

const Clases = () => {
  return (
    <div className="container mt-5">
      <div className="mb-4">
        <h2 className="text-center">Experimenta con la cerámica</h2>
        <p>
          Con las clases de cerámica y alfarería mensuales aprenderás técnicas concretas y descubrirás todas las posibilidades que te ofrece para hacer tus propias piezas. Clases de cerámica artística y alfarería mensuales.
        </p>
        <p>
          Todas nuestras clases están enfocadas a iniciación. Aunque el espacio se comparte, trabajarás en tus propios proyectos. Diseñaremos las piezas que vayas a crear y te guiamos para que puedas hacerlo. De esta manera, aprenderás las diferentes técnicas a un ritmo libre y personalizado. Puedes elegir venir a clases de cerámica artística o de alfarería.
        </p>
      </div>
      <h1 className="text-center">Clases mensuales de cerámica</h1>
      <p className="text-center">¡Reserva tu plaza ahora!</p>
      <Formulario />
    </div>
  );
};

export default Clases;

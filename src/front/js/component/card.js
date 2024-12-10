import React from "react";

export const Card = ({ clase, onInscripcion }) => {
    return (
        <div className="card">
            <img
                src={clase.imagen}
                className="card-img-top img-fluid"
                alt={clase.nombre}
            />
            <div className="card-body">
                <h5 className="card-title">{clase.nombre}</h5>
                <p className="card-text">{clase.descripcion}</p>
                <p className="text-primary">Precio: {clase.precio}</p>
                <button
                    className="btn btn-success"
                    onClick={() => onInscripcion(clase.id)}
                >
                    ¡Me interesa!
                </button>
            </div>
        </div>
    );
};

export default Card;
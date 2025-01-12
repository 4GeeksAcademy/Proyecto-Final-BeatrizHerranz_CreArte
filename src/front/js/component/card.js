import React, { useContext } from "react";
import { Context } from "../store/appContext";
import '../../styles/card.css';

export const Card = ({ clase, onInscripcion }) => {
    const { store, actions } = useContext(Context);

    const handleFavorite = (clase) => {
        if (!store?.favorites?.find(item => item.id === clase.id)) {
            actions.addBonoToFavorites(clase);  
        }
    };

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
                    Añadir al Carrito
                </button>
                
            </div>
        </div>
    );
};

export default Card;

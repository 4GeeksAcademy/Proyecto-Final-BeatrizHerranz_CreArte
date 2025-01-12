import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import '../../styles/clases.css';

const Clases = () => {
  const navigate = useNavigate();
  const { store, actions } = useContext(Context);
  const clases = [
    {
      id: 1,
      nombre: 'Curso de Cerámica Básica',
      descripcion: 'Aprende las técnicas esenciales de la cerámica y crea tus primeras piezas. Perfecto para empezar tu camino artístico.',
      imagen: 'https://static.wixstatic.com/media/d1031ccfa4a545ad9ba13816fefbaf6f.jpg/v1/crop/x_266,y_0,w_4939,h_3648/fill/w_612,h_452,al_c,q_80,usm_1.20_1.00_0.01,enc_avif,quality_auto/Potter%20mujer%20haciendo%20taza%20.jpg',
      precio: '50'
    },
    {
      id: 2,
      nombre: 'Iniciación a la Alfarería',
      descripcion: 'Domina el arte de la alfarería. Aprende a modelar arcilla y crea objetos funcionales como tazas y cuencos.',
      imagen: 'https://static.wixstatic.com/media/aca133_8ede09a940234b0b8cadf8832ed68d57~mv2.jpg/v1/crop/x_0,y_78,w_512,h_379/fill/w_614,h_455,al_c,lg_1,q_80,usm_1.20_1.00_0.01,enc_avif,quality_auto/Manos2_edited.jpg',
      precio: '60'
    },
    {
      id: 3,
      nombre: 'Iniciación al Modelado',
      descripcion: 'Descubre cómo modelar piezas únicas de arcilla, desde vajillas hasta pequeñas esculturas, con técnicas básicas.',
      imagen: 'https://static.wixstatic.com/media/aca133_7feacf9a19724ad0ba3ae0b923527db0~mv2.png/v1/fill/w_694,h_514,al_c,q_85,usm_1.20_1.00_0.01,enc_avif,quality_auto/BONO-INICIACION-AL-MODELADO-cua.png',
      precio: '80'
    }
  ];
  const handleAddToCart = (clase) => {
    actions.addToCart({
      ...clase,
      precio: `${clase.precio}€`
    });
  };
  return (
    <div className="container mt-5">
      <h2 className="text-center">Experimenta con la cerámica</h2>
      <p className="intro-text">
        Con nuestras clases mensuales de cerámica y alfarería, aprenderás técnicas específicas y descubrirás todas las posibilidades que te ofrece para hacer tus propias piezas.
      </p>
      <p className="intro-text">
        Todas nuestras clases están diseñadas para principiantes. Aunque el espacio es compartido, cada uno trabajará en sus propios proyectos. Te ayudaremos a diseñar y crear las piezas que quieras, guiándote en cada paso.
      </p>
      <h1 className="text-center mb-4">Clases mensuales de cerámica</h1>
      <div className="row">
        {clases.map((clase) => (
          <div className="col-md-4 col-sm-6 col-12 mb-4" key={clase.id}>
            <div className="card h-100">
              <img
                src={clase.imagen}
                className="card-img-top"
                alt={clase.nombre}
                style={{ height: "200px", objectFit: "cover" }}
              />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{clase.nombre}</h5>
                <p className="card-text">{clase.descripcion}</p>
                <p className="text-primary">Precio: {clase.precio}€</p>
                <div className="mt-auto">
                  <button
                    className="btn btn-success w-100 mb-2"
                    onClick={() => handleAddToCart(clase)}
                  >
                    {store.cart.some((item) => item.id === clase.id)
                      ? "Añadir Otra"
                      : "Añadir al Carrito"}
                  </button>
                  <button
                    className="btn btn-outline-warning w-100"
                    onClick={() => actions.toggleFavorite(clase)}
                  >
                    {store.favorites.some((item) => item.id === clase.id)
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
export default Clases;
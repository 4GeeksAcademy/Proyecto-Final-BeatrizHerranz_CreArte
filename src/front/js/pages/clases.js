import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import Card from "../component/card";
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
      precio: '50 €'
    },
    {
      id: 2,
      nombre: 'Iniciación a la Alfarería',
      descripcion: 'Domina el arte de la alfarería. Aprende a modelar arcilla y crea objetos funcionales como tazas y cuencos.',
      imagen: 'https://static.wixstatic.com/media/aca133_8ede09a940234b0b8cadf8832ed68d57~mv2.jpg/v1/crop/x_0,y_78,w_512,h_379/fill/w_614,h_455,al_c,lg_1,q_80,usm_1.20_1.00_0.01,enc_avif,quality_auto/Manos2_edited.jpg',
      precio: '60 €'
    },
    {
      id: 3,
      nombre: 'Iniciación al Modelado',
      descripcion: 'Descubre cómo modelar piezas únicas de arcilla, desde vajillas hasta pequeñas esculturas, con técnicas básicas.',
      imagen: 'https://static.wixstatic.com/media/aca133_7feacf9a19724ad0ba3ae0b923527db0~mv2.png/v1/fill/w_694,h_514,al_c,q_85,usm_1.20_1.00_0.01,enc_avif,quality_auto/BONO-INICIACION-AL-MODELADO-cua.png',
      precio: '80 €'
    }
  ];

  const handleInscripcion = (id) => {
    const claseSeleccionada = clases.find(clase => clase.id === id);
    if (!claseSeleccionada) {
      alert("Clase no encontrada.");
      return;
    }

    // Verificar si el producto ya está en el carrito
    const itemInCart = store.cart.find(item => item.id === id);

    if (itemInCart) {
      // Si ya está en el carrito, se aumenta la cantidad
      actions.addToCart(claseSeleccionada);
    } else {
      // Si no está en el carrito, se añade por primera vez
      actions.addToCart(claseSeleccionada);
      navigate("/cart");  // Redirige al carrito después de añadir
    }
  };

  // Función para manejar los favoritos
  const handleFavorite = (course) => {
    const isFavorite = store.favorites.some(fav => fav.id === course.id);
    if (isFavorite) {
      actions.removeFromFavorites(course.id);
    } else {
      actions.addToFavorites(course);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center">Experimenta con la cerámica</h2>
      <p className="intro-text">
        Con nuestras clases mensuales de cerámica y alfarería, aprenderás técnicas específicas y descubrirás todas las posibilidades que te ofrece para hacer tus propias piezas.
      </p>
      <p className="intro-text">
        Todas nuestras clases están diseñadas para principiantes. Aunque el espacio es compartido, cada uno trabajará en sus propios proyectos. Te ayudaremos a diseñar y crear las piezas que quieras, guiándote en cada paso. De esta manera, aprenderás las diferentes técnicas a tu propio ritmo y de manera personalizada.
      </p>

      <h1 className="text-center">Clases mensuales de cerámica</h1>
      <div className="row">
        {clases.map((clase) => (
          <div className="col-md-4 col-sm-6 col-12 mb-4" key={clase.id}>
            <Card
              clase={clase}
              onInscripcion={handleInscripcion}  // Pasa la función de inscripción
              onFavorite={() => handleFavorite(clase)}  // Pasa la función para manejar favoritos
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Clases;

import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import Carousel from "../component/carousel";
import '../../styles/home.css';

export const Home = () => {
    const navigate = useNavigate();
    const { store, actions } = useContext(Context);

    const carouselImages = [
        {
            src: "https://amasarte.es/wp-content/uploads/elementor/thumbs/clases-de-ceramica-art-y-alf-mensuales2-qsb01jqazm9vrfn13ajffg4n5jto7m0vzijhr6tiby.png",
            alt: "Imagen carrusel 1"
        },
        {
            src: "https://amasarte.es/wp-content/uploads/2023/11/eventos-con-amasarte.jpg",
            alt: "Imagen carrusel 2"
        },
    ];

    return (
        <div className="home-container">

            {/* Título y descripción principal */}
            <div className="text-center mt-5">
                <h1 className="display-4">¡Despierta tu creatividad con CreArte!</h1>
                <h2 className="lead">Descubre tu potencial artístico en nuestras clases de cerámica y alfarería.</h2>
            </div>

            {/* Carrusel */}
            <Carousel images={carouselImages} />

            {/* Sección de información sobre CreArte */}
            <section className="info-crearte">
                <div className="container">
                    <p>
                        Aprende a crear tus propias piezas de cerámica desde el primer día.
                    </p>
                    <h2>¿Qué ofrecemos?</h2>
                    <p>
                        En CreArte, nos dedicamos a impulsar la creatividad y la pasión por el arte de la cerámica y la alfarería. Ofrecemos una amplia variedad de clases de cerámica, diseñadas para todos los niveles.
                        Aprenderás paso a paso a crear y decorar tus piezas desde los conceptos más básicos hasta las técnicas más complejas. 
                        Nuestros cursos son impartidos por profesionales experimentados que comparten su conocimiento y pasión por el arte de la cerámica.
                    </p>
                </div>
            </section>

        </div>
    );
};

export default Home;

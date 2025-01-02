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
        }
    ];

    return (
        <div className="home-container">

            {/* Título y descripción principal */}
            <div className="text-center mt-5">
                <h1 className="display-4">¡Despierta tu creatividad con CreArte!</h1>
                <p className="lead">Descubre tu potencial artístico en nuestras clases de cerámica y alfarería.</p>
            </div>

            {/* Carrusel */}
            <Carousel images={carouselImages} />

            {/* Sección de información sobre CreArte */}
            <section className="info-crearte">
                <div className="container">
                    <p>
                        Disfruta de la iniciación a las técnicas cerámicas.
                    </p>
                    <p>
                        Tú nos dices qué quieres crear y te guiamos hasta conseguirlo, avanzando a tu propio ritmo.
                        Aunque el espacio sea compartido, trabajarás en tus propios proyectos. No hay un ritmo de trabajo fijo, diseñaremos las piezas que quieras realizar y te ayudaremos a llevarlas a cabo.
                        La cerámica ofrece infinitas posibilidades, y si tienes un proyecto en mente, ¡estamos encantados de ayudarte!
                    </p>
                    <p>
                        Puedes elegir entre clases de cerámica artística o alfarería.
                    </p>
                    <h2>¿Por qué elegir CreArte?</h2>
                    <p>
                        En CreArte, nos dedicamos a impulsar la creatividad y la pasión por el arte de la cerámica y la alfarería.
                        Ofrecemos clases prácticas y dinámicas que te permitirán mejorar tus habilidades artísticas, todo mientras vives una experiencia única y enriquecedora.
                    </p>
                    <h3>¿Qué ofrecemos?</h3>
                    <p>
                        En CreArte, ofrecemos una amplia variedad de clases de cerámica, diseñadas para todos los niveles.
                        Nuestros cursos son impartidos por profesionales experimentados que comparten su conocimiento y pasión por el arte de la cerámica.
                    </p>
                </div>
            </section>

        </div>
    );
};

export default Home;

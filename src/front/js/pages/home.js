import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import Carousel from "../component/carousel";
import Card from "../component/card";


export const Home = () => {
    const navigate = useNavigate();
    const { store, actions } = useContext(Context);

    const clases = [
        {
            id: 1,
            nombre: 'Curso de Cerámica Básica',
            descripcion: 'Aprende las técnicas esenciales de la cerámica y crea tus primeras piezas. Perfecto para empezar tu camino artístico.',
            imagen: 'https://static.wixstatic.com/media/11062b_147dc3a6f24349ff9a4d332be4360d81~mv2.jpg/v1/fill/w_750,h_768,al_c,q_85,usm_1.20_1.00_0.01,enc_auto/11062b_147dc3a6f24349ff9a4d332be4360d81~mv2.jpg',
            precio: '40 €'
        },
        {
            id: 2,
            nombre: 'Iniciación a la Alfarería',
            descripcion: 'Domina el arte de la alfarería. Aprende a modelar arcilla y crea objetos funcionales como tazas y cuencos.',
            imagen: 'https://static.wixstatic.com/media/aca133_8ede09a940234b0b8cadf8832ed68d57~mv2.jpg/v1/crop/x_0,y_78,w_512,h_379/fill/w_614,h_455,al_c,lg_1,q_80,usm_1.20_1.00_0.01,enc_auto/Manos2_edited.jpg',
            precio: '50 €'
        },
        {
            id: 3,
            nombre: 'Iniciación al Modelado',
            descripcion: 'Descubre cómo modelar piezas únicas de arcilla, desde vajillas hasta pequeñas esculturas, con técnicas básicas.',
            imagen: 'https://static.wixstatic.com/media/aca133_7feacf9a19724ad0ba3ae0b923527db0~mv2.png/v1/fill/w_694,h_514,al_c,q_85,usm_1.20_1.00_0.01,enc_auto/BONO-INICIACION-AL-MODELADO-cua.png',
            precio: '45 €'
        }
    ];

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

    const handleInscripcion = (id) => {
        const claseSeleccionada = clases.find((clase) => clase.id === id);
        const claseYaEnCarrito = store.cartItems.find((item) => item.id === id);

        if (!claseYaEnCarrito) {
            actions.addCourseToCart(claseSeleccionada);
            navigate("/cart");
        } else {
            alert("Esta clase ya está en tu carrito.");
        }
    };

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
            <section className="info-crearte my-5">
                <div className="container text-center">
                    <p>
                        Disfruta con la iniciación a las técnicas cerámicas
                        Tú nos dices qué quieres crear y te guiamos hasta conseguirlo. ¡De esta manera avanzarás a tu propio ritmo!
                        Aunque el espacio se comparte, trabajarás en tus propios proyectos. Esto significa que no hay un ritmo de trabajo establecido, sino que se diseñan las piezas que se van a realizar y te guiamos para que puedas llevarlas a cabo.

                        Te iniciarás en las técnicas cerámicas a un ritmo libre y personalizado. La cerámica ofrece cantidad de posibilidades que te despertarán el ánimo de crear todo tipo de piezas, aunque si tenéis un proyecto en mente, nos encanta ayudarte a realizarlo.

                        Puedes elegir venir a clases de cerámica artística o de alfarería.
                    </p>
                    <h2>¿Por qué elegir CreArte?</h2>
                    <p>
                        En CreArte, nos dedicamos a impulsar la creatividad y la pasión por el arte de la cerámica y la alfarería. Ofrecemos clases prácticas y dinámicas que te permiten mejorar tus habilidades artísticas, todo mientras vives una experiencia única y enriquecedora.
                    </p>
                    <h3>¿Qué ofrecemos?</h3>
                    <p>
                        En CreArte, ofrecemos una amplia variedad de clases de cerámica, diseñadas para todos los niveles. Nuestros cursos
                        son impartidos por profesionales experimentados que comparten su conocimiento y pasión por el arte de la cerámica.
                    </p>
                </div>
            </section>

            {/* Sección de nuestros cursos */}
            <div className="container mt-5" id="clases">
                <h2 className="text-center nuestros-cursos-title">Nuestros Cursos</h2>
                <div className="row">
                    {clases.map((clase) => (
                        <div className="col-md-4 col-sm-6 col-12 mb-4" key={clase.id}>
                            <Card clase={clase} onInscripcion={handleInscripcion} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Home;
import React from "react";

export const Carousel = ({ images }) => {
    return (
        <div id="carouselExample" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-inner">
                {images.map((image, index) => (
                    <div 
                        className={`carousel-item ${index === 0 ? "active" : ""}`} 
                        key={index}
                    >
                        <img
                            src={image.src}
                            className="d-block w-100 img-fluid"
                            alt={image.alt}
                        />
                    </div>
                ))}
            </div>
            <button 
                className="carousel-control-prev" 
                type="button" 
                data-bs-target="#carouselExample" 
                data-bs-slide="prev"
            >
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Anterior</span>
            </button>
            <button 
                className="carousel-control-next" 
                type="button" 
                data-bs-target="#carouselExample" 
                data-bs-slide="next"
            >
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Siguiente</span>
            </button>
        </div>
    );
};

export default Carousel;
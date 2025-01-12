import React, { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import axios from "axios";

export default function Private() {
    const navigate = useNavigate();
    const { store, actions } = useContext(Context);
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const token = sessionStorage.getItem("token");
        if (!token) {
            navigate("/login");
            return;
        }
        const checkAuth = async () => {
            try {
                const response = await axios.get(
                    `${process.env.BACKEND_URL}`,
                    {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    }
                );
                setUserData(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Error de autenticación:", error);
                sessionStorage.removeItem("token");
                navigate("/login");
            }
        };
        checkAuth();
    }, [navigate]);
    const handleLogout = () => {
        sessionStorage.removeItem("token");
        navigate("/login");
    };
    if (loading) {
        return (
            <div className="container mt-5 text-center">
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Cargando...</span>
                </div>
            </div>
        );
    }
    return (
        <div className="container mt-5">
            <div className="row">
                {/* Información del Usuario */}
                <div className="col-md-8 mb-4">
                    <div className="card">
                        <div className="card-body">
                            <div className="d-flex justify-content-between align-items-center mb-4">
                                <h2>Mi Perfil</h2>
                                <button
                                    onClick={handleLogout}
                                    className="btn btn-danger"
                                >
                                    Cerrar Sesión
                                </button>
                            </div>
                            {userData && (
                                <div>
                                    <p><strong></strong> {userData.email}</p>
                                    {userData.profile && (
                                        <>
                                            <p><strong>Nombre:</strong> {userData.profile.first_name || 'No especificado'}</p>
                                            <p><strong>Apellidos:</strong> {userData.profile.last_name || 'No especificado'}</p>
                                            <p><strong>Teléfono:</strong> {userData.profile.phone || 'No especificado'}</p>
                                            <p><strong>Dirección:</strong> {userData.profile.address || 'No especificada'}</p>
                                        </>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                {/* Favoritos */}
                <div className="col-md-4 mb-4">
                    <div className="card">
                        <div className="card-body">
                            <h3>Mis Favoritos</h3>
                            {store.favorites.length === 0 ? (
                                <p>No tienes favoritos guardados.</p>
                            ) : (
                                <div className="list-group">
                                    {store.favorites.map((item) => (
                                        <div key={item.id} className="list-group-item list-group-item-action">
                                            <div className="d-flex w-100 justify-content-between align-items-center">
                                                <div>
                                                    <h6 className="mb-1">{item.nombre}</h6>
                                                    <small className="text-muted">{item.precio}€</small>
                                                </div>
                                                <div>
                                                    <button
                                                        className="btn btn-sm btn-outline-primary me-2"
                                                        onClick={() => actions.addToCart(item)}
                                                    >
                                                        :carrito_de_compras:
                                                    </button>
                                                    <button
                                                        className="btn btn-sm btn-outline-danger"
                                                        onClick={() => actions.removeFromFavorites(item.id)}
                                                    >
                                                        :x:
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                {/* Historial de Compras (si lo necesitas) */}
                <div className="col-12">
                    <div className="card">
                        <div className="card-body">
                            <h3>Carrito Actual</h3>
                            {store.cart.length === 0 ? (
                                <p>No tienes productos en el carrito.</p>
                            ) : (
                                <div className="list-group">
                                    {store.cart.map((item) => (
                                        <div key={item.id} className="list-group-item">
                                            <div className="d-flex justify-content-between align-items-center">
                                                <div>
                                                    <h6 className="mb-1">{item.nombre}</h6>
                                                    <small className="text-muted">
                                                        Cantidad: {item.cantidad || 1} x {item.precio}€
                                                    </small>
                                                </div>
                                                <button
                                                    className="btn btn-sm btn-outline-danger"
                                                    onClick={() => actions.removeFromCart(item.id)}
                                                >
                                                    Eliminar
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                    <div className="mt-3">
                                        <button
                                            className="btn btn-success"
                                            onClick={() => navigate('/cart')}
                                        >
                                            Ir al Carrito
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
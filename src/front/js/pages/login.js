import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
    const [loginData, setLoginData] = useState({
        email: "",
        password: ""
    });
    const [errorMessage, setErrorMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    // Para limpiar el componente al desmontar
    useEffect(() => {
        let isSubscribed = true;
        return () => {
            isSubscribed = false;
        };
    }, []);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoginData(prev => ({
            ...prev,
            [name]: value
        }));
        if (errorMessage) setErrorMessage("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setErrorMessage("");
        try {
            const response = await axios.post(
                'https://refactored-palm-tree-r47qgpxwrxp7cv5x-3001.app.github.dev/api/login',
                loginData,
                {
                    headers: { "Content-Type": "application/json" },
                    timeout: 5000
                }
            );
            // Verificar la estructura correcta de la respuesta
            if (response.data && response.data.access_token) {
                // Guardar el token
                sessionStorage.setItem("token", response.data.access_token);
                // Guardar información del usuario si es necesario
                if (response.data.user) {
                    sessionStorage.setItem("user", JSON.stringify(response.data.user));
                }
                navigate("/private");
            } else {
                setErrorMessage("Error en el formato de respuesta del servidor");
            }
        } catch (error) {
            console.error("Error de autenticación:", error);
            if (error.response) {
                setErrorMessage(error.response.data.error || "Credenciales inválidas");
            } else if (error.request) {
                setErrorMessage("No se pudo conectar con el servidor");
            } else {
                setErrorMessage("Error al iniciar sesión");
            }
        } finally {
            setIsLoading(false);
        }
    };
    
    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-12 col-md-8 col-lg-6">
                    <div className="card">
                        <div className="card-body">
                            <h2 className="card-title text-center mb-4">Iniciar Sesión</h2>
                            {errorMessage && (
                                <div className="alert alert-danger" role="alert">
                                    {errorMessage}
                                </div>
                            )}
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="email"
                                        name="email"
                                        value={loginData.email}
                                        onChange={handleChange}
                                        required
                                        disabled={isLoading}
                                        placeholder="ejemplo@email.com"
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">
                                        Contraseña
                                    </label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="password"
                                        name="password"
                                        value={loginData.password}
                                        onChange={handleChange}
                                        required
                                        disabled={isLoading}
                                        placeholder="Tu contraseña"
                                    />
                                </div>
                                <div className="d-grid gap-2">
                                    <button
                                        type="submit"
                                        className="btn btn-primary"
                                        disabled={isLoading}
                                    >
                                        {isLoading ? (
                                            <>
                                                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                                Iniciando sesión...
                                            </>
                                        ) : (
                                            'Iniciar Sesión'
                                        )}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
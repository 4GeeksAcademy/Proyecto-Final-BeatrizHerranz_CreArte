import React, { useState } from "react";
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

    // Manejar cambios en los campos del formulario
    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoginData((prev) => ({
            ...prev,
            [name]: value
        }));
        if (errorMessage) setErrorMessage("");
    };

    // Manejar el envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setErrorMessage(""); 

        try {
            const response = await axios.post(
                `${process.env.BACKEND_URL}/api/login`, 
                loginData,
                {
                    headers: { "Content-Type": "application/json" },
                    timeout: 5000
                }
            );

            // Verificar si la respuesta contiene el token de acceso
            if (response.data && response.data.access_token) {
                sessionStorage.setItem("token", response.data.access_token);
                if (response.data.user) {
                    sessionStorage.setItem("user", JSON.stringify(response.data.user));
                }
                navigate("/private");
            } else {
                setErrorMessage("Error en el formato de respuesta del servidor");
            }
        } catch (error) {
            console.error("Error de autenticación:", error);
            setErrorMessage(error?.response?.data?.error || "Error al iniciar sesión");
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

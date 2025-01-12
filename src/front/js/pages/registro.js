import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
export default function Registro() {
    // Estados para el formulario
    const [signupData, setSignUpData] = useState({
        email: "",
        password: ""
    });
    // Estados para UI
    const [errorMessage, setErrorMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    // Manejar cambios en los inputs
    const handleChange = (e) => {
        const { name, value } = e.target;
        setSignUpData(prev => ({
            ...prev,
            [name]: value
        }));
        // Limpiar mensaje de error cuando el usuario empiece a escribir
        if (errorMessage) setErrorMessage("");
    };
    // Manejar envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setErrorMessage("");
        try {
            const response = await axios.post(
                'https://refactored-palm-tree-r47qgpxwrxp7cv5x-3001.app.github.dev/api/registrar',
                signupData,
                {
                    headers: {
                        "Content-Type": "application/json"
                    },
                    timeout: 5000 // 5 segundos de timeout
                }
            );
            if (response.data && response.data.error) {
                setErrorMessage(response.data.error);
                return;
            }
            console.log("Usuario registrado exitosamente:", response.data);
            // Opcional: Guardar el token si tu backend lo envía
            if (response.data.token) {
                localStorage.setItem("token", response.data.token);
            }
            navigate("/login");
        } catch (error) {
            console.error("Error durante el registro:", error);
            if (error.response) {
                // Error con respuesta del servidor
                setErrorMessage(error.response.data.mensaje || "Error en el registro. Por favor, verifica tus datos.");
            } else if (error.request) {
                // Error de conexión
                setErrorMessage("No se pudo conectar con el servidor. Por favor, verifica tu conexión a internet.");
            } else {
                // Otros errores
                setErrorMessage("Ocurrió un error inesperado. Por favor, intenta nuevamente.");
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
                            <h2 className="card-title text-center mb-4">Registro</h2>
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
                                        value={signupData.email}
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
                                        value={signupData.password}
                                        onChange={handleChange}
                                        required
                                        disabled={isLoading}
                                        placeholder="Ingresa tu contraseña"
                                        minLength="6"
                                    />
                                    <div className="form-text">
                                        La contraseña debe tener al menos 6 caracteres
                                    </div>
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
                                                Registrando...
                                            </>
                                        ) : (
                                            'Registrarse'
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
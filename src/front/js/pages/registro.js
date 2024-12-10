import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Registro() {
    const [signupData, setSignUpData] = useState({
        email: "",
        password: ""
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setSignUpData({
            ...signupData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          
            const response = await axios.post(
                `${process.env.BACKEND_URL}/api/registrar`,
                signupData,
                {
                    headers: { "Content-Type": "application/json" },
                }
            );
            console.log("Usuario registrado:", response.data);
            navigate("/login"); 
        } catch (error) {
            console.error("Ha habido un error:", error);
            if (error.response && error.response.data) {
                
                setErrorMessage(error.response.data.mensaje || "Error desconocido");
            } else {
                setErrorMessage("Error al comunicarse con el servidor");
            }
        }
    };

    return (
        <div className="container mt-5">
            <h2>Registro</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        value={signupData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Contraseña</label>
                    <input 
                        type="password"
                        className="form-control"
                        id="password"
                        name="password"
                        value={signupData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">Registrarse</button>
            </form>
        </div>
    );
}

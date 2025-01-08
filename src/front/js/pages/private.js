import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Private() {
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);
    const [favorites, setFavorites] = useState([]);
    const [passwordData, setPasswordData] = useState({
        currentPassword: "",
        newPassword: "",
        confirmNewPassword: "",
    });

    useEffect(() => {
        const token = sessionStorage.getItem("token");
        if (!token) {
            navigate("/login");
            return;
        }

        fetchUserData();
        fetchFavorites();
    }, [navigate]);

    const fetchUserData = () => {
        const mockUser = {
            name: "Juan Pérez",
            email: "juan.perez@example.com",
        };
        setUserData(mockUser);
    };

    const fetchFavorites = () => {
        const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
        setFavorites(storedFavorites);
    };

    const handleAddToFavorites = (product) => {
        const newFavorites = [...favorites, product];
        setFavorites(newFavorites);
        localStorage.setItem("favorites", JSON.stringify(newFavorites));
    };

    const handleRemoveFromFavorites = (id) => {
        const newFavorites = favorites.filter(item => item.id !== id);
        setFavorites(newFavorites);
        localStorage.setItem("favorites", JSON.stringify(newFavorites));
    };

    const handleLogout = () => {
        sessionStorage.removeItem("token");
        navigate("/login");
    };

    const handleEdit = (e) => {
        e.preventDefault();
        console.log("Datos actualizados:", userData);
        alert("Datos actualizados con éxito");
    };

    const handlePasswordChange = (e) => {
        const { name, value } = e.target;
        setPasswordData({ ...passwordData, [name]: value });
    };

    const handlePasswordSubmit = (e) => {
        e.preventDefault();
        const { currentPassword, newPassword, confirmNewPassword } = passwordData;

        if (!currentPassword || !newPassword || !confirmNewPassword) {
            alert("Todos los campos son obligatorios");
            return;
        }

        if (newPassword !== confirmNewPassword) {
            alert("La nueva contraseña y su confirmación no coinciden");
            return;
        }

        console.log("Contraseña actualizada:", { currentPassword, newPassword });
        alert("Contraseña actualizada con éxito");
        setPasswordData({ currentPassword: "", newPassword: "", confirmNewPassword: "" });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    };

    const handleDeleteProfile = () => {
        const confirmDelete = window.confirm(
            "¿Estás seguro de que deseas eliminar tu perfil? Esta acción no se puede deshacer."
        );
        if (confirmDelete) {
            console.log("Perfil eliminado");
            alert("Perfil eliminado con éxito");
            sessionStorage.removeItem("token");
            navigate("/login");
        }
    };

    return (
        <div className="container mt-5">
            <h2>Página Privada</h2>
            {userData ? (
                <div>
                    <h3>Datos del Usuario</h3>
                    <form onSubmit={handleEdit}>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">
                                Nombre
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="name"
                                name="name"
                                value={userData.name}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">
                                Correo Electrónico
                            </label>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                name="email"
                                value={userData.email}
                                onChange={handleInputChange}
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">
                            Guardar Cambios
                        </button>
                    </form>

                    <h3 className="mt-4">Favoritos</h3>
                    <ul>
                        {favorites.length > 0 ? (
                            favorites.map((item) => (
                                <li key={item.id}>
                                    <span>{item.name}</span>
                                    <button
                                        className="btn btn-danger ms-2"
                                        onClick={() => handleRemoveFromFavorites(item.id)}
                                    >
                                        Eliminar
                                    </button>
                                </li>
                            ))
                        ) : (
                            <p>No tienes productos favoritos.</p>
                        )}
                    </ul>

                    <h3 className="mt-4">Cambiar Contraseña</h3>
                    <form onSubmit={handlePasswordSubmit}>
                        <div className="mb-3">
                            <label htmlFor="currentPassword" className="form-label">
                                Contraseña Actual
                            </label>
                            <input
                                type="password"
                                className="form-control"
                                id="currentPassword"
                                name="currentPassword"
                                value={passwordData.currentPassword}
                                onChange={handlePasswordChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="newPassword" className="form-label">
                                Nueva Contraseña
                            </label>
                            <input
                                type="password"
                                className="form-control"
                                id="newPassword"
                                name="newPassword"
                                value={passwordData.newPassword}
                                onChange={handlePasswordChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="confirmNewPassword" className="form-label">
                                Confirmar Nueva Contraseña
                            </label>
                            <input
                                type="password"
                                className="form-control"
                                id="confirmNewPassword"
                                name="confirmNewPassword"
                                value={passwordData.confirmNewPassword}
                                onChange={handlePasswordChange}
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">
                            Cambiar Contraseña
                        </button>
                    </form>

                    <h3 className="mt-4">Eliminar Perfil</h3>
                    <button className="btn btn-danger" onClick={handleDeleteProfile}>
                        Eliminar mi cuenta
                    </button>
                </div>
            ) : (
                <p>Cargando datos del usuario...</p>
            )}
        </div>
    );
}

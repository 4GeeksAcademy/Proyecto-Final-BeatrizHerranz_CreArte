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
                            <label htmlFor="name" className="form-label">Nombre</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                className="form-control"
                                value={userData.name}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Correo Electrónico</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                className="form-control"
                                value={userData.email}
                                onChange={handleInputChange}
                            />
                        </div>

                        <h3>Favoritos</h3>
                        {favorites.length === 0 ? (
                            <p>No tienes productos favoritos.</p>
                        ) : (
                            <ul>
                                {favorites.map(favorite => (
                                    <li key={favorite.id}>
                                        {favorite.name}
                                        <button onClick={() => handleRemoveFromFavorites(favorite.id)}>
                                            Eliminar
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        )}
                        <button
                            type="button"
                            className="btn btn-success"
                            onClick={() => handleAddToFavorites({ id: 3, name: "Producto 3" })}
                        >
                            Añadir a Favoritos
                        </button>
                        <button type="submit" className="btn btn-primary">Guardar Cambios</button>
                    </form>
                    <hr />

                    <h3>Cambiar Contraseña</h3>
                    <form onSubmit={handlePasswordSubmit}>
                        <div className="mb-3">
                            <label htmlFor="currentPassword" className="form-label">Contraseña Actual</label>
                            <input
                                type="password"
                                id="currentPassword"
                                name="currentPassword"
                                className="form-control"
                                value={passwordData.currentPassword}
                                onChange={handlePasswordChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="newPassword" className="form-label">Nueva Contraseña</label>
                            <input
                                type="password"
                                id="newPassword"
                                name="newPassword"
                                className="form-control"
                                value={passwordData.newPassword}
                                onChange={handlePasswordChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="confirmNewPassword" className="form-label">Confirmar Nueva Contraseña</label>
                            <input
                                type="password"
                                id="confirmNewPassword"
                                name="confirmNewPassword"
                                className="form-control"
                                value={passwordData.confirmNewPassword}
                                onChange={handlePasswordChange}
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">Actualizar Contraseña</button>
                    </form>
                    <hr />
                    <button onClick={handleDeleteProfile} className="btn btn-danger">Eliminar Perfil</button>
                </div>
            ) : (
                <p>Cargando datos del usuario...</p>
            )}
            <hr />
            <button onClick={handleLogout} className="btn btn-secondary">Cerrar Sesión</button>
        </div>
    );
}

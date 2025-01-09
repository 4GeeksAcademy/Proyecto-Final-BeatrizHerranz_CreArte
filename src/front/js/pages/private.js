import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
export default function Private() {
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);
    const [courses, setCourses] = useState([]);
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
        fetchUserCourses();
    }, [navigate]);
    const fetchUserData = () => {
        const mockUser = {
            name: "Juan Pérez",
            email: "juan.perez@example.com",
        };
        setUserData(mockUser);
    };
    const fetchUserCourses = () => {
        const mockCourses = [
            { id: 1, title: "Curso de React" },
            { id: 2, title: "Curso de Node.js" },
        ];
        setCourses(mockCourses);
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
                </div>
            ) : (
                <p>Cargando datos del usuario...</p>
            )}
            <hr />
            <h3>Mis Cursos</h3>
            {courses.length > 0 ? (
                <ul className="list-group">
                    {courses.map(course => (
                        <li key={course.id} className="list-group-item">
                            {course.title}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No tienes cursos registrados.</p>
            )}
            <hr />
            <button onClick={handleLogout} className="btn btn-danger">Cerrar Sesión</button>
        </div>
    );
}
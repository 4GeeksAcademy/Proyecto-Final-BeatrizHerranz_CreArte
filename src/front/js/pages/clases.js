import React, { useState } from "react";

const Clases = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    correo: "",
    horario: "",
    comentarios: "",
  });
  const [submissionMessage, setSubmissionMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { nombre, correo, horario } = formData;

    if (!nombre || !correo || !horario) {
      setSubmissionMessage("Por favor, completa todos los campos obligatorios.");
      return;
    }

    setSubmissionMessage("¡Inscripción recibida!");
    setFormData({ nombre: "", correo: "", horario: "", comentarios: "" });
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center">Clases mensuales de cerámica</h1>
      <p className="text-center">¡Reserva tu plaza ahora!</p>

      <form onSubmit={handleSubmit} className="mt-4">
        <input
          type="text"
          name="nombre"
          value={formData.nombre}
          onChange={handleChange}
          placeholder="Nombre y Apellido"
          className="form-control mb-3"
          required
        />
        <input
          type="email"
          name="correo"
          value={formData.correo}
          onChange={handleChange}
          placeholder="Correo Electrónico"
          className="form-control mb-3"
          required
        />
        <select
          name="horario"
          value={formData.horario}
          onChange={handleChange}
          className="form-control mb-3"
          required
        >
          <option value="">Selecciona un horario</option>
          <option value="Mañanas">Mañanas (11:00 a 14:00)</option>
          <option value="Tardes">Tardes (16:00 a 21:00)</option>
        </select>
        <textarea
          name="comentarios"
          value={formData.comentarios}
          onChange={handleChange}
          placeholder="Comentarios adicionales"
          className="form-control mb-3"
          rows="4"
        ></textarea>
        <button type="submit" className="btn btn-primary w-100">Inscribirse</button>
      </form>

      {submissionMessage && (
        <div className="alert alert-success text-center mt-3">{submissionMessage}</div>
      )}
    </div>
  );
};

export default Clases;


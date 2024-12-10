import React, { useState } from "react";

const Formulario = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    correo: "",
    horario: "",
    curso: "",
    comentarios: "",
  });
  const [submissionMessage, setSubmissionMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { nombre, correo, horario, curso } = formData;

    if (!nombre || !correo || !horario || !curso) {
      setSubmissionMessage("Por favor, completa todos los campos obligatorios.");
      setIsError(true);
      return;
    }

    setSubmissionMessage("¡Inscripción recibida! Pronto nos pondremos en contacto contigo.");
    setIsError(false);
    setFormData({ nombre: "", correo: "", horario: "", curso: "", comentarios: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <div className="mb-3">
        <label htmlFor="nombre" className="form-label">Nombre y Apellido:</label>
        <input
          type="text"
          id="nombre"
          name="nombre"
          value={formData.nombre}
          onChange={handleChange}
          className="form-control"
          required
        />
      </div>

      <div className="mb-3">
        <label htmlFor="correo" className="form-label">Correo Electrónico:</label>
        <input
          type="email"
          id="correo"
          name="correo"
          value={formData.correo}
          onChange={handleChange}
          className="form-control"
          required
        />
      </div>

      <div className="mb-3">
        <label htmlFor="horario" className="form-label">Selecciona un horario:</label>
        <select
          id="horario"
          name="horario"
          value={formData.horario}
          onChange={handleChange}
          className="form-control"
          required
        >
          <option value="">-- Selecciona --</option>
          <option value="Mañanas">Mañanas (11:00 a 14:00)</option>
          <option value="Tardes">Tardes (16:00 a 21:00)</option>
        </select>
      </div>

      <div className="mb-3">
        <label htmlFor="curso" className="form-label">Selecciona un curso:</label>
        <select
          id="curso"
          name="curso"
          value={formData.curso}
          onChange={handleChange}
          className="form-control"
          required
        >
          <option value="">-- Selecciona --</option>
          <option value="Cerámica">Cerámica</option>
          <option value="Alfarería">Alfarería</option>
        </select>
      </div>

      <div className="mb-3">
        <label htmlFor="comentarios" className="form-label">Comentarios adicionales:</label>
        <textarea
          id="comentarios"
          name="comentarios"
          value={formData.comentarios}
          onChange={handleChange}
          className="form-control"
          rows="4"
        ></textarea>
      </div>

      <button type="submit" className="btn btn-primary w-100">Inscribirse</button>

      {submissionMessage && (
        <div
          className={`alert mt-3 text-center ${isError ? "alert-danger" : "alert-success"}`}
        >
          {submissionMessage}
        </div>
      )}
    </form>
  );
};

export default Formulario;

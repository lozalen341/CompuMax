import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../../assets/css/NuevoTurno.module.css";

function NuevoTurno() {
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState({ text: "", type: "" });
    const [selectedService, setSelectedService] = useState("");
    const formRef = useRef(null);

    const [formData, setFormData] = useState({
        servicio: "",
        descripcion: "",
        fecha: "",
        hora: ""
    });

    const servicios = [
        {
            id: "reparacion-pc",
            icon: "💻",
            title: "Reparación de PC",
            description: "Mantenimiento, limpieza y reparación de computadoras"
        },
        {
            id: "dispositivos-moviles",
            icon: "📱",
            title: "Dispositivos Móviles",
            description: "Reparación de celulares y tablets"
        },
        {
            id: "recuperacion-datos",
            icon: "💾",
            title: "Recuperación de Datos",
            description: "Rescate de información de discos duros"
        },
        {
            id: "mantenimiento",
            icon: "🔧",
            title: "Mantenimiento",
            description: "Limpieza y optimización de equipos"
        },
        {
            id: "instalacion-software",
            icon: "💿",
            title: "Instalación de Software",
            description: "Sistemas operativos y programas"
        },
        {
            id: "impresoras",
            icon: "🖨️",
            title: "Impresoras",
            description: "Configuración y reparación de impresoras"
        }
    ];

    const handleServiceClick = (serviceId) => {
        setSelectedService(serviceId);
        setFormData({
            ...formData,
            servicio: serviceId
        });

        // Scroll suave al formulario
        setTimeout(() => {
            formRef.current?.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }, 100);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });

        if (name === 'servicio') {
            setSelectedService(value);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setMessage({ text: "", type: "" });

        try {
            const token = localStorage.getItem('token');
            const userId = localStorage.getItem('userId');

            if (!token || !userId) {
                throw new Error('No se encontró la información de autenticación');
            }

            // Formatear fechas según lo esperado por el backend
            const dateCreated = new Date().toISOString();
            const deliveryDateTime = new Date(`${formData.fecha}T${formData.hora}:00`).toISOString();

            const API_KEY = import.meta.env.VITE_API_KEY;
            const response = await fetch('http://localhost:3000/turnos/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-key': API_KEY,
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    id_user: parseInt(userId),
                    dateCreated: dateCreated,
                    deliveryTime: deliveryDateTime,
                    status: "pendiente",
                    description: `${formData.servicio}: ${formData.descripcion}`
                })
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error || 'Error al crear el turno');
            }

            // Mostrar mensaje de éxito
            setMessage({
                text: '¡Turno creado exitosamente! Redirigiendo...',
                type: 'success'
            });

            // Redirigir después de 2 segundos
            setTimeout(() => {
                navigate('/user/mis-turnos');
            }, 2000);

        } catch (error) {
            console.error('Error al crear el turno:', error);
            setMessage({
                text: error.message || 'Error al procesar la solicitud',
                type: 'error'
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const hoy = new Date();
    const maxDate = new Date();
    maxDate.setDate(hoy.getDate() + 60);

    return (
        <main className={styles.mainContent}>
            {/* Header */}
            <div className={styles.contentHeader}>
                <div className={styles.headerLeft}>
                    <h1 className={styles.pageTitle}>➕ Solicitar Nuevo Turno</h1>
                    <p className={styles.pageSubtitle}>Completa el formulario para agendar un servicio</p>
                </div>
            </div>

            <div className={styles.formContainer}>
                {/* Servicios Disponibles */}
                <div className={styles.serviciosSection}>
                    <h2 className={styles.sectionTitle}>🛠️ Servicios Disponibles</h2>
                    <p className={styles.serviciosHint}>Selecciona el servicio que necesitas</p>

                    <div className={styles.serviciosGrid}>
                        {servicios.map((servicio) => (
                            <div
                                key={servicio.id}
                                className={`${styles.servicioCard} ${selectedService === servicio.id ? styles.servicioCardSelected : ''
                                    }`}
                                onClick={() => handleServiceClick(servicio.id)}
                            >
                                {selectedService === servicio.id && (
                                    <div className={styles.checkMark}>✓</div>
                                )}
                                <div className={styles.servicioIcon}>{servicio.icon}</div>
                                <h3 className={styles.servicioTitle}>{servicio.title}</h3>
                                <p className={styles.servicioDescription}>{servicio.description}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Formulario */}
                <div ref={formRef} className={styles.formSection}>
                    <h2 className={styles.sectionTitle}>📋 Detalles del Turno</h2>

                    <form onSubmit={handleSubmit} className={styles.form}>
                        <div className={styles.formGroup}>
                            <label className={styles.formLabel}>
                                🛠️ Tipo de Servicio *
                            </label>
                            <select
                                name="servicio"
                                className={styles.formSelect}
                                value={formData.servicio}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Selecciona un servicio</option>
                                {servicios.map((servicio) => (
                                    <option key={servicio.id} value={servicio.id}>
                                        {servicio.title}
                                    </option>
                                ))}
                            </select>
                            <span className={styles.formHint}>
                                También puedes seleccionar una tarjeta arriba ☝️
                            </span>
                        </div>

                        <div className={styles.formGroup}>
                            <label className={styles.formLabel}>
                                📝 Descripción del Problema *
                            </label>
                            <textarea
                                name="descripcion"
                                className={styles.formTextarea}
                                placeholder="Describe detalladamente el problema o servicio que necesitas..."
                                value={formData.descripcion}
                                onChange={handleChange}
                                rows="5"
                                required
                            ></textarea>
                            <span className={styles.formHint}>
                                Cuanto más detallada sea la descripción, mejor podremos ayudarte
                            </span>
                        </div>

                        <div className={styles.formRow}>
                            <div className={styles.formGroup}>
                                <label className={styles.formLabel}>
                                    📆 Fecha Preferida *
                                </label>
                                <input
                                    type="date"
                                    name="fecha"
                                    className={styles.formInput}
                                    value={formData.fecha}
                                    onChange={handleChange}
                                    required
                                    min={hoy.toISOString().split("T")[0]}
                                    max={maxDate.toISOString().split("T")[0]}
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <label className={styles.formLabel}>
                                    ⏰ Hora Preferida *
                                </label>
                                <select
                                    name="hora"
                                    className={styles.formSelect}
                                    value={formData.hora}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Selecciona un horario</option>
                                    <option value="09:00">09:00 AM</option>
                                    <option value="10:00">10:00 AM</option>
                                    <option value="11:00">11:00 AM</option>
                                    <option value="12:00">12:00 PM</option>
                                    <option value="14:00">02:00 PM</option>
                                    <option value="15:00">03:00 PM</option>
                                    <option value="16:00">04:00 PM</option>
                                    <option value="17:00">05:00 PM</option>
                                </select>
                            </div>
                        </div>

                        {/* Info Box */}
                        <div className={styles.infoBox}>
                            <div className={styles.infoIcon}>💡</div>
                            <div className={styles.infoContent}>
                                <h4 className={styles.infoTitle}>Importante</h4>
                                <ul className={styles.infoList}>
                                    <li>Los turnos están sujetos a disponibilidad</li>
                                    <li>Recibirás una confirmación por email</li>
                                    <li>Puedes cancelar hasta 24hs antes</li>
                                </ul>
                            </div>
                        </div>

                        {message.text && (
                            <div className={`${styles.message} ${message.type === 'error' ? styles.error : styles.success}`}>
                                {message.text}
                            </div>
                        )}

                        {/* Buttons */}
                        <div className={styles.formActions}>
                            <button
                                type="submit"
                                className={styles.btnPrimary}
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? '⏳ Procesando...' : '✓ Solicitar Turno'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </main>
    );
}

export default NuevoTurno;
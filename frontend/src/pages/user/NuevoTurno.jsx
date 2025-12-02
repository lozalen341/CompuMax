import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../../assets/css/NuevoTurno.module.css";

function NuevoTurno() {
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState({ text: "", type: "" });
    
    const [formData, setFormData] = useState({
        servicio: "",
        descripcion: "",
        fecha: "",
        hora: ""
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
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
                    <div className={styles.serviciosGrid}>
                        <div className={styles.servicioCard}>
                            <div className={styles.servicioIcon}>💻</div>
                            <h3 className={styles.servicioTitle}>Reparación de PC</h3>
                            <p className={styles.servicioDescription}>Mantenimiento, limpieza y reparación de computadoras</p>
                        </div>

                        <div className={styles.servicioCard}>
                            <div className={styles.servicioIcon}>📱</div>
                            <h3 className={styles.servicioTitle}>Dispositivos Móviles</h3>
                            <p className={styles.servicioDescription}>Reparación de celulares y tablets</p>
                        </div>

                        <div className={styles.servicioCard}>
                            <div className={styles.servicioIcon}>💾</div>
                            <h3 className={styles.servicioTitle}>Recuperación de Datos</h3>
                            <p className={styles.servicioDescription}>Rescate de información de discos duros</p>
                        </div>

                        <div className={styles.servicioCard}>
                            <div className={styles.servicioIcon}>🔧</div>
                            <h3 className={styles.servicioTitle}>Mantenimiento</h3>
                            <p className={styles.servicioDescription}>Limpieza y optimización de equipos</p>
                        </div>

                        <div className={styles.servicioCard}>
                            <div className={styles.servicioIcon}>💿</div>
                            <h3 className={styles.servicioTitle}>Instalación de Software</h3>
                            <p className={styles.servicioDescription}>Sistemas operativos y programas</p>
                        </div>

                        <div className={styles.servicioCard}>
                            <div className={styles.servicioIcon}>🖨️</div>
                            <h3 className={styles.servicioTitle}>Impresoras</h3>
                            <p className={styles.servicioDescription}>Configuración y reparación de impresoras</p>
                        </div>
                    </div>
                </div>

                {/* Formulario */}
                <div className={styles.formSection}>
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
                                <option value="reparacion-pc">Reparación de PC</option>
                                <option value="dispositivos-moviles">Dispositivos Móviles</option>
                                <option value="recuperacion-datos">Recuperación de Datos</option>
                                <option value="mantenimiento">Mantenimiento</option>
                                <option value="instalacion-software">Instalación de Software</option>
                                <option value="impresoras">Impresoras</option>
                            </select>
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
                                {isSubmitting ? 'Procesando...' : '✓ Solicitar Turno'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </main>
    );
}

export default NuevoTurno;

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../../assets/css/MisTurnos.module.css";

function MisTurnos() {
    const navigate = useNavigate();
    const [filtroEstado, setFiltroEstado] = useState("Todos");
    const [busqueda, setBusqueda] = useState("");
    const [turnos, setTurnos] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [message, setMessage] = useState({ text: "", type: "" });
    const [cancelingId, setCancelingId] = useState(null);
    const [modalEliminar, setModalEliminar] = useState(false);
    const [turnoAEliminar, setTurnoAEliminar] = useState(null);

    // Función para formatear fechas
    const formatDate = (dateString) => {
        const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
        return new Date(dateString).toLocaleDateString('es-ES', options);
    };

    // Función para formatear horas
    const formatTime = (dateString) => {
        const options = { hour: '2-digit', minute: '2-digit' };
        return new Date(dateString).toLocaleTimeString('es-ES', options);
    };

    // Función para obtener la clase CSS del estado
    const getEstadoClass = (status) => {
        const statusLower = status.toLowerCase().trim();
        if (statusLower === "pendiente") return "pendiente";
        if (statusLower === "en proceso" || statusLower === "en_proceso") return "en-proceso";
        if (statusLower === "finalizado") return "finalizado";
        if (statusLower === "cancelado") return "cancelado";
        return "";
    };

    const abrirModalEliminar = (turno) => {
        setTurnoAEliminar(turno);
        setModalEliminar(true);
    };

    const cerrarModalEliminar = () => {
        setModalEliminar(false);
        setTurnoAEliminar(null);
    };

    const confirmarEliminar = async () => {
        try {
            const token = localStorage.getItem('token');
            const API_KEY = import.meta.env.VITE_API_KEY;
            // En vez de eliminar el turno, lo marcamos como 'cancelado' en la base de datos
            const response = await fetch(`http://localhost:3000/turnos/update/${turnoAEliminar.id_ticket}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-key': API_KEY,
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ status: 'cancelado' })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Error al cancelar el turno');
            }

            setMessage({ text: 'Turno cancelado correctamente', type: 'success' });
            // Refrescar lista
            await fetchTurnos();
            cerrarModalEliminar();
            
            // Limpiar mensaje después de 3 segundos
            setTimeout(() => setMessage({ text: "", type: "" }), 3000);
            
        } catch (error) {
            console.error('Error al cancelar el turno:', error);
            setMessage({ text: error.message || 'Error al cancelar el turno', type: 'error' });
            cerrarModalEliminar();
        }
    };

    // Obtener los turnos del usuario
    const fetchTurnos = async () => {
        try {
            const token = localStorage.getItem('token');
            const userId = localStorage.getItem('userId');
            
            if (!token || !userId) {
                throw new Error('No se encontró la información de autenticación');
            }

            const API_KEY = import.meta.env.VITE_API_KEY;
            const response = await fetch(`http://localhost:3000/turnos/getById/${userId}`, {
                headers: {
                    'x-api-key': API_KEY,
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error('Error al obtener los turnos');
            }

            const data = await response.json();
            setTurnos(data.turno || []);
        } catch (err) {
            console.error('Error:', err);
            setError(err.message || 'Error al cargar los turnos');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchTurnos();
    }, []);

    // Filtrar turnos según el estado y la búsqueda
    const filteredTurnos = turnos.filter(turno => {
        const matchesEstado = filtroEstado === "Todos" || 
                            turno.status.toLowerCase() === filtroEstado.toLowerCase();
        const matchesSearch = turno.description.toLowerCase().includes(busqueda.toLowerCase()) ||
                            turno.id_ticket.toString().includes(busqueda);
        return matchesEstado && matchesSearch;
    });

    // Calcular estadísticas
    const normalize = s => s?.toLowerCase().trim() ?? "";
    const stats = {
        total: turnos.length,
        pendientes: turnos.filter(t => normalize(t.status) === 'pendiente').length,
        enProceso: turnos.filter(t => normalize(t.status) === 'en proceso' || normalize(t.status) === 'en_proceso').length,
        finalizados: turnos.filter(t => normalize(t.status) === 'finalizado').length
    };

    // Mapear estados del backend a estados para mostrar
    const getEstadoMostrar = (estado) => {
        const estados = {
            'pendiente': 'Pendiente',
            'en_proceso': 'En Proceso',
            'en proceso': 'En Proceso',
            'finalizado': 'Finalizado',
            'cancelado': 'Cancelado'
        };
        return estados[estado.toLowerCase()] || estado;
    };

    // Mapear íconos según el servicio
    const getIconoPorServicio = (descripcion) => {
        if (descripcion.includes('PC')) return '💻';
        if (descripcion.includes('Celular') || descripcion.includes('Móvil')) return '📱';
        if (descripcion.includes('Datos')) return '💾';
        if (descripcion.includes('Software') || descripcion.includes('Windows')) return '💿';
        if (descripcion.includes('Impresora')) return '🖨️';
        return '🔧';
    };

    if (isLoading) {
        return (
            <main className={styles.mainContent}>
                <div className={styles.loadingContainer}>
                    <div className={styles.spinner}></div>
                    <p>Cargando tus turnos...</p>
                </div>
            </main>
        );
    }

    if (error) {
        return (
            <main className={styles.mainContent}>
                <div className={styles.errorContainer}>
                    <div className={styles.errorIcon}>⚠️</div>
                    <h3>Error al cargar los turnos</h3>
                    <p>{error}</p>
                    <button 
                        className={styles.btnPrimary}
                        onClick={fetchTurnos}
                    >
                        Reintentar
                    </button>
                </div>
            </main>
        );
    }

    return (
        <main className={styles.mainContent}>
            {/* Header */}
            <div className={styles.contentHeader}>
                <div className={styles.headerLeft}>
                    <h1 className={styles.pageTitle}>📅 Mis Turnos</h1>
                    <p className={styles.pageSubtitle}>Administra tus citas y servicios</p>
                </div>
                <div className={styles.headerActions}>
                    <button 
                        className={styles.btnPrimary}
                        onClick={() => navigate('/user/nuevo-turno')}
                    >
                        <span>+</span>
                        <span>Nuevo Turno</span>
                    </button>
                </div>
            </div>

            {/* Mensaje de feedback */}
            {message.text && (
                <div className={`${styles.messageAlert} ${styles[message.type]}`}>
                    {message.text}
                </div>
            )}

            {/* Stats Grid */}
            <div className={styles.statsGrid}>
                <div className={`${styles.statCard} ${styles.statPending}`}>
                    <div className={styles.statIcon}>⏳</div>
                    <div className={styles.statContent}>
                        <h3>{stats.pendientes}</h3>
                        <p>Pendientes</p>
                    </div>
                </div>

                <div className={`${styles.statCard} ${styles.statProcess}`}>
                    <div className={styles.statIcon}>🔧</div>
                    <div className={styles.statContent}>
                        <h3>{stats.enProceso}</h3>
                        <p>En Proceso</p>
                    </div>
                </div>

                <div className={`${styles.statCard} ${styles.statCompleted}`}>
                    <div className={styles.statIcon}>✓</div>
                    <div className={styles.statContent}>
                        <h3>{stats.finalizados}</h3>
                        <p>Finalizados</p>
                    </div>
                </div>

                <div className={`${styles.statCard} ${styles.statTotal}`}>
                    <div className={styles.statIcon}>📋</div>
                    <div className={styles.statContent}>
                        <h3>{stats.total}</h3>
                        <p>Total</p>
                    </div>
                </div>
            </div>

            {/* Filters Bar */}
            <div className={styles.filtersBar}>
                <div className={styles.searchBox}>
                    <span className={styles.searchIcon}>🔍</span>
                    <input
                        type="text"
                        className={styles.searchInput}
                        placeholder="Buscar por servicio o ID..."
                        value={busqueda}
                        onChange={(e) => setBusqueda(e.target.value)}
                    />
                </div>

                <div className={styles.filterGroup}>
                    <select
                        className={styles.filterSelect}
                        value={filtroEstado}
                        onChange={(e) => setFiltroEstado(e.target.value)}
                    >
                        <option value="Todos">Todos los Estados</option>
                        <option value="pendiente">Pendiente</option>
                        <option value="en proceso">En Proceso</option>
                        <option value="finalizado">Finalizado</option>
                        <option value="cancelado">Cancelado</option>
                    </select>
                </div>
            </div>

            {/* Turnos List */}
            <div className={styles.turnosContainer}>
                <div className={styles.sectionHeader}>
                    <h2 className={styles.sectionTitle}>📋 Lista de Turnos</h2>
                    <span className={styles.totalCount}>
                        {filteredTurnos.length} {filteredTurnos.length === 1 ? 'turno' : 'turnos'} mostrados
                    </span>
                </div>

                {filteredTurnos.length > 0 ? (
                    <div className={styles.turnosGrid}>
                        {filteredTurnos.map((turno) => {
                            const fechaFormateada = formatDate(turno.deliveryTime);
                            const horaFormateada = formatTime(turno.deliveryTime);
                            const estadoMostrar = getEstadoMostrar(turno.status);
                            const icono = getIconoPorServicio(turno.description);

                            return (
                                <div key={turno.id_ticket} className={styles.turnoCard}>
                                    <div className={styles.cardHeader}>
                                        <div className={styles.cardIcon}>{icono}</div>
                                        <span className={`${styles.statusBadge} ${styles[getEstadoClass(turno.status)]}`}>
                                            {estadoMostrar}
                                        </span>
                                    </div>

                                    <div className={styles.cardBody}>
                                        <h3 className={styles.cardTitle}>
                                            {turno.description.split(':')[0] || 'Servicio'}
                                        </h3>
                                        <p className={styles.cardDescription}>
                                            {turno.description.split(':').slice(1).join(':').trim() || 'Sin descripción adicional'}
                                        </p>
                                        
                                        <div className={styles.cardDetails}>
                                            <div className={styles.detailItem}>
                                                <span className={styles.detailIcon}>🆔</span>
                                                <span className={styles.detailText}>#{turno.id_ticket}</span>
                                            </div>
                                            <div className={styles.detailItem}>
                                                <span className={styles.detailIcon}>📆</span>
                                                <span className={styles.detailText}>{fechaFormateada}</span>
                                            </div>
                                            <div className={styles.detailItem}>
                                                <span className={styles.detailIcon}>⏰</span>
                                                <span className={styles.detailText}>{horaFormateada}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className={styles.cardFooter}>
                                        {(turno.status.toLowerCase() === 'pendiente') && (
                                            <button 
                                                className={`${styles.btnAction} ${styles.btnCancel}`}
                                                onClick={() => abrirModalEliminar(turno)}
                                            >
                                                ❌ Cancelar
                                            </button>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div className={styles.emptyState}>
                        <div className={styles.emptyIcon}>📭</div>
                        <h3 className={styles.emptyTitle}>
                            {busqueda || filtroEstado !== "Todos" 
                                ? "No se encontraron turnos que coincidan" 
                                : "No tienes turnos registrados"}
                        </h3>
                        <p className={styles.emptyDescription}>
                            {busqueda || filtroEstado !== "Todos"
                                ? "Prueba con otros términos de búsqueda o filtros"
                                : "Solicita tu primer turno para comenzar"}
                        </p>
                        {(busqueda || filtroEstado !== "Todos") ? (
                            <button 
                                className={styles.btnEmpty}
                                onClick={() => {
                                    setBusqueda("");
                                    setFiltroEstado("Todos");
                                }}
                            >
                                Limpiar filtros
                            </button>
                        ) : (
                            <button 
                                className={styles.btnEmpty}
                                onClick={() => navigate('/user/nuevo-turno')}
                            >
                                Solicitar Turno
                            </button>
                        )}
                    </div>
                )}
            </div>

            {/* Modal de confirmación de eliminación */}
            {modalEliminar && turnoAEliminar && (
                <div className={styles.modalOverlay} onClick={cerrarModalEliminar}>
                    <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                        <div className={styles.modalHeader}>
                            <h2 className={styles.modalTitle}>⚠️ Confirmar Cancelación</h2>
                            <button className={styles.modalClose} onClick={cerrarModalEliminar}>×</button>
                        </div>
                        
                        <div className={styles.modalBody}>
                            <div className={styles.warningBox}>
                                <div className={styles.warningIcon}>🗑️</div>
                                <p className={styles.warningText}>
                                    ¿Estás seguro de que deseas cancelar este turno?
                                </p>
                            </div>

                            <div className={styles.turnoInfo}>
                                <p><strong>ID Turno:</strong> #{turnoAEliminar.id_ticket}</p>
                                <p><strong>Servicio:</strong> {turnoAEliminar.description}</p>
                                <p><strong>Fecha:</strong> {formatDate(turnoAEliminar.deliveryTime)}</p>
                                <p><strong>Hora:</strong> {formatTime(turnoAEliminar.deliveryTime)}</p>
                                <p><strong>Estado:</strong> 
                                    <span className={`${styles.statusBadge} ${styles[getEstadoClass(turnoAEliminar.status)]}`}>
                                        {getEstadoMostrar(turnoAEliminar.status)}
                                    </span>
                                </p>
                            </div>

                            <div className={styles.alertMessage}>
                                <strong>⚠️ Advertencia:</strong> Esta acción no se puede deshacer.
                            </div>
                        </div>

                        <div className={styles.modalFooter}>
                            <button className={styles.btnCancelar} onClick={cerrarModalEliminar}>
                                No, mantener turno
                            </button>
                            <button className={styles.btnEliminar} onClick={confirmarEliminar}>
                                Sí, cancelar turno
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
}

export default MisTurnos;
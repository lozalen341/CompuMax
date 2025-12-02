import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../../assets/css/DashboardUser.module.css";

function DashboardUser() {
    const [turnos, setTurnos] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const userId = localStorage.getItem('userId');
    const userName = localStorage.getItem('userName') || 'Usuario';

    // Fetch user's turnos
    useEffect(() => {
        const fetchTurnos = async () => {
            try {
                const token = localStorage.getItem('token');
                const API_KEY = import.meta.env.VITE_API_KEY;
                
                const response = await fetch(`http://localhost:3000/turnos/getById/${userId}`, {
                    headers: {
                        'x-api-key': API_KEY,
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (!response.ok) {
                    throw new Error('Error al cargar los turnos');
                }

                const data = await response.json();
                setTurnos(data.user || []);
            } catch (err) {
                console.error('Error:', err);
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        if (userId) {
            fetchTurnos();
        }
    }, [userId]);

    // Calculate counts by status
    const getCountByStatus = (status) => {
        return turnos.filter(turno => turno.status.toLowerCase() === status.toLowerCase()).length;
    };

    const pendientesCount = getCountByStatus('pendiente');
    const enProcesoCount = getCountByStatus('en proceso');
    const completadosCount = getCountByStatus('completado');
    const totalTurnos = turnos.length;

    // Get next 3 upcoming non-completed turnos
    const getUpcomingTurnos = () => {
        const now = new Date();
        return turnos
            .filter(turno => 
                turno.status.toLowerCase() !== 'completado' && 
                new Date(turno.deliveryTime) > now
            )
            .sort((a, b) => new Date(a.deliveryTime) - new Date(b.deliveryTime))
            .slice(0, 3);
    };

    const upcomingTurnos = getUpcomingTurnos();

    // Format date for display
    const formatDate = (dateString) => {
        const options = { day: 'numeric', month: 'short', year: 'numeric' };
        return new Date(dateString).toLocaleDateString('es-ES', options);
    };

    // Format time for display
    const formatTime = (dateString) => {
        const options = { hour: '2-digit', minute: '2-digit' };
        return new Date(dateString).toLocaleTimeString('es-ES', options);
    };

    if (isLoading) return <div className={styles.loading}>Cargando...</div>;
    if (error) return <div className={styles.error}>Error: {error}</div>;

    return (
        <div className={styles.mainContent}>
            {/* Header con saludo personalizado */}
            <div className={styles.contentHeader}>
                <div className={styles.headerLeft}>
                    <h1 className={styles.pageTitle}>👋 ¡Hola, {userName}!</h1>
                    <p className={styles.pageSubtitle}>Bienvenido a tu panel de gestión</p>
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

            {/* Stats Grid */}
            <div className={styles.statsGrid}>
                <div className={styles.statCard}>
                    <div className={styles.statIcon} style={{ background: "rgba(245, 158, 11, 0.15)" }}>
                        ⏳
                    </div>
                    <div className={styles.statContent}>
                        <h3 className={styles.statNumber}>{pendientesCount}</h3>
                        <p className={styles.statLabel}>Turnos Pendientes</p>
                        <span className={styles.statTrend}>→ Próximos en la semana</span>
                    </div>
                </div>

                <div className={styles.statCard}>
                    <div className={styles.statIcon} style={{ background: "rgba(59, 130, 246, 0.15)" }}>
                        🔧
                    </div>
                    <div className={styles.statContent}>
                        <h3 className={styles.statNumber}>{enProcesoCount}</h3>
                        <p className={styles.statLabel}>En Proceso</p>
                        <span className={styles.statTrend}>→ En reparación</span>
                    </div>
                </div>

                <div className={styles.statCard}>
                    <div className={styles.statIcon} style={{ background: "rgba(16, 185, 129, 0.15)" }}>
                        ✓
                    </div>
                    <div className={styles.statContent}>
                        <h3 className={styles.statNumber}>{completadosCount}</h3>
                        <p className={styles.statLabel}>Completados</p>
                        <span className={styles.statTrend}>→ Este mes</span>
                    </div>
                </div>

                <div className={styles.statCard}>
                    <div className={styles.statIcon} style={{ background: "rgba(139, 92, 246, 0.15)" }}>
                        📋
                    </div>
                    <div className={styles.statContent}>
                        <h3 className={styles.statNumber}>{totalTurnos}</h3>
                        <p className={styles.statLabel}>Total de Turnos</p>
                        <span className={styles.statTrend}>→ Histórico</span>
                    </div>
                </div>
            </div>

            {/* Próximos Turnos */}
            <div className={styles.sectionCard}>
                <div className={styles.sectionHeader}>
                    <h2 className={styles.sectionTitle}>📅 Próximos Turnos</h2>
                    <a href="/user/mis-turnos" className={styles.sectionLink}>Ver todos →</a>
                </div>
                
                <div className={styles.turnosList}>
                    {upcomingTurnos.length > 0 ? (
                        upcomingTurnos.map(turno => (
                            <div key={turno.id_ticket} className={styles.turnoItem}>
                                <div className={styles.turnoLeft}>
                                    <div className={styles.turnoIcon}>
                                        {turno.description.includes('PC') ? '💻' : '📱'}
                                    </div>
                                    <div className={styles.turnoInfo}>
                                        <h3 className={styles.turnoTitle}>
                                            {turno.description.split('-')[0].trim()}
                                        </h3>
                                        <p className={styles.turnoDescription}>
                                            {turno.description.split('-').slice(1).join('-').trim() || 'Sin descripción adicional'}
                                        </p>
                                    </div>
                                </div>
                                <div className={styles.turnoRight}>
                                    <div className={styles.turnoDate}>
                                        <span className={styles.dateLabel}>📆 Fecha</span>
                                        <span className={styles.dateValue}>{formatDate(turno.deliveryTime)}</span>
                                    </div>
                                    <div className={styles.turnoTime}>
                                        <span className={styles.timeLabel}>⏰ Hora</span>
                                        <span className={styles.timeValue}>{formatTime(turno.deliveryTime)}</span>
                                    </div>
                                    <span className={`${styles.statusBadge} ${styles[turno.status.toLowerCase().replace(' ', '')]}`}>
                                        {turno.status}
                                    </span>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className={styles.noTurnos}>
                            <p>No tienes turnos programados próximamente.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default DashboardUser;

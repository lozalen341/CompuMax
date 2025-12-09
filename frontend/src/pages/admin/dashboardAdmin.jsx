import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "../../assets/css/Dashboard.module.css";
import userStyles from "../../assets/css/DashboardUser.module.css";

function DashboardAdmin() {
    const [turnos, setTurnos] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTurnos = async () => {
            try {
                const API_KEY = import.meta.env.VITE_API_KEY;
                const token = localStorage.getItem("token");

                const res = await fetch("http://localhost:3000/turnos/getall", {
                    headers: {
                        "x-api-key": API_KEY,
                        ...(token ? { Authorization: `Bearer ${token}` } : {})
                    }
                });

                if (!res.ok) throw new Error("Error al obtener turnos");

                const data = await res.json();
                setTurnos(Array.isArray(data.turno) ? data.turno : []);
            } catch (err) {
                console.error(err);
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchTurnos();
    }, []);

    const normalizeStatus = (s) => (s || "").toString().replace(/_/g, " ").toLowerCase().trim();

    const getCountByStatus = (status) => {
        return turnos.filter(t => normalizeStatus(t.status) === normalizeStatus(status)).length;
    };

    const pendientesCount = getCountByStatus('pendiente');
    const enProcesoCount = getCountByStatus('en proceso') + getCountByStatus('en_proceso');
    const completadosCount = getCountByStatus('completado');

    const enProcesoTurnos = turnos.filter(t => normalizeStatus(t.status) === 'en proceso').slice(0, 5);

    const formatDate = (dateString) => {
        try {
            const options = { day: 'numeric', month: 'short', year: 'numeric' };
            return new Date(dateString).toLocaleDateString('es-ES', options);
        } catch {
            return '-';
        }
    };

    const formatTime = (dateString) => {
        try {
            const options = { hour: '2-digit', minute: '2-digit' };
            return new Date(dateString).toLocaleTimeString('es-ES', options);
        } catch {
            return '-';
        }
    };

    return (
        <>
            <div className={styles.contentHeader}>
                <div className={styles.headerLeft}>
                    <h1 className={styles.pageTitle}>📊 Dashboard</h1>
                    <p className={styles.pageSubtitle}>Resumen general de tu negocio</p>
                </div>
            </div>

            <div className={styles.statsGrid}>
                <div className={styles.statCard}>
                    <div className={styles.statIcon} style={{ background: "rgba(245, 158, 11, 0.15)" }}>
                        ⏳
                    </div>
                    <div className={styles.statContent}>
                        <h3 className={styles.statNumber}>{isLoading ? '—' : pendientesCount}</h3>
                        <p className={styles.statLabel}>Turnos Pendientes</p>
                        <span className={styles.statTrend}>→ Visibles en la cola</span>
                    </div>
                </div>

                <div className={styles.statCard}>
                    <div className={styles.statIcon} style={{ background: "rgba(59, 130, 246, 0.15)" }}>
                        🔧
                    </div>
                    <div className={styles.statContent}>
                        <h3 className={styles.statNumber}>{isLoading ? '—' : enProcesoCount}</h3>
                        <p className={styles.statLabel}>En Proceso</p>
                        <span className={styles.statTrend}>→ Actualmente en taller</span>
                    </div>
                </div>

                <div className={styles.statCard}>
                    <div className={styles.statIcon} style={{ background: "rgba(16, 185, 129, 0.15)" }}>
                        ✓
                    </div>
                    <div className={styles.statContent}>
                        <h3 className={styles.statNumber}>{isLoading ? '—' : completadosCount}</h3>
                        <p className={styles.statLabel}>Completados</p>
                        <span className={styles.statTrend}>→ Este mes</span>
                    </div>
                </div>
            </div>

            {/* Turnos en proceso - reutiliza estilos de DashboardUser */}
            <div className={userStyles.sectionCard}>
                <div className={userStyles.sectionHeader}>
                    <h2 className={userStyles.sectionTitle}>🔧 Turnos en Proceso</h2>
                    <Link to="/admin/turnos" className={userStyles.sectionLink}>Ir a Gestión de Turnos →</Link>
                </div>

                {isLoading ? (
                    <div>Cargando turnos...</div>
                ) : error ? (
                    <div>Error: {error}</div>
                ) : (
                    <div className={userStyles.turnosList}>
                        {enProcesoTurnos.length > 0 ? (
                            enProcesoTurnos.map(turno => (
                                <div key={turno.id_ticket} className={userStyles.turnoItem}>
                                    <div className={userStyles.turnoLeft}>
                                        <div className={userStyles.turnoIcon}>
                                            {turno.description && turno.description.toLowerCase().includes('pc') ? '💻' : '📱'}
                                        </div>
                                        <div className={userStyles.turnoInfo}>
                                            <h3 className={userStyles.turnoTitle}>
                                                {turno.description ? turno.description.split('-')[0].trim() : `Turno #${turno.id_ticket}`}
                                            </h3>
                                            <p className={userStyles.turnoDescription}>
                                                {turno.description ? turno.description.split('-').slice(1).join('-').trim() : 'Sin descripción adicional'}
                                            </p>
                                        </div>
                                    </div>
                                    <div className={userStyles.turnoRight}>
                                        <div className={userStyles.turnoDate}>
                                            <span className={userStyles.dateLabel}>📆 Fecha</span>
                                            <span className={userStyles.dateValue}>{formatDate(turno.deliveryTime)}</span>
                                        </div>
                                        <div className={userStyles.turnoTime}>
                                            <span className={userStyles.timeLabel}>⏰ Hora</span>
                                            <span className={userStyles.timeValue}>{formatTime(turno.deliveryTime)}</span>
                                        </div>
                                        <span className={`${userStyles.statusBadge} ${userStyles.proceso}`}>En Proceso</span>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className={userStyles.emptyState}>
                                <div className={userStyles.emptyIcon}>🛠️</div>
                                <h3 className={userStyles.emptyTitle}>No hay turnos en proceso</h3>
                                <p className={userStyles.emptyDescription}>Actualmente no hay reparaciones activas.</p>
                                <Link to="/admin/turnos" className={userStyles.btnEmpty}>Ver Turnos</Link>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </>
    );
}

function AdminDashboard() {
    return (
        <div className={styles.mainContent}>
            <DashboardAdmin />
        </div>
    );
}

export default AdminDashboard;

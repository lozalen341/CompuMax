import styles from "../../assets/css/DashboardUser.module.css";

function DashboardUser() {
    // Datos de ejemplo - reemplazar con datos reales del usuario
    const userName = "Juan Pérez";
    
    return (
        <div className={styles.mainContent}>
            {/* Header con saludo personalizado */}
            <div className={styles.contentHeader}>
                <div className={styles.headerLeft}>
                    <h1 className={styles.pageTitle}>👋 ¡Hola, {userName}!</h1>
                    <p className={styles.pageSubtitle}>Bienvenido a tu panel de gestión</p>
                </div>
                <div className={styles.headerActions}>
                    <button className={styles.btnPrimary}>
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
                        <h3 className={styles.statNumber}>2</h3>
                        <p className={styles.statLabel}>Turnos Pendientes</p>
                        <span className={styles.statTrend}>→ Próximos en la semana</span>
                    </div>
                </div>

                <div className={styles.statCard}>
                    <div className={styles.statIcon} style={{ background: "rgba(59, 130, 246, 0.15)" }}>
                        🔧
                    </div>
                    <div className={styles.statContent}>
                        <h3 className={styles.statNumber}>1</h3>
                        <p className={styles.statLabel}>En Proceso</p>
                        <span className={styles.statTrend}>→ En reparación</span>
                    </div>
                </div>

                <div className={styles.statCard}>
                    <div className={styles.statIcon} style={{ background: "rgba(16, 185, 129, 0.15)" }}>
                        ✓
                    </div>
                    <div className={styles.statContent}>
                        <h3 className={styles.statNumber}>8</h3>
                        <p className={styles.statLabel}>Completados</p>
                        <span className={styles.statTrend}>→ Este mes</span>
                    </div>
                </div>

                <div className={styles.statCard}>
                    <div className={styles.statIcon} style={{ background: "rgba(139, 92, 246, 0.15)" }}>
                        📋
                    </div>
                    <div className={styles.statContent}>
                        <h3 className={styles.statNumber}>11</h3>
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
                    {/* Turno 1 */}
                    <div className={styles.turnoItem}>
                        <div className={styles.turnoLeft}>
                            <div className={styles.turnoIcon}>💻</div>
                            <div className={styles.turnoInfo}>
                                <h3 className={styles.turnoTitle}>Reparación de PC</h3>
                                <p className={styles.turnoDescription}>Mantenimiento preventivo y limpieza</p>
                            </div>
                        </div>
                        <div className={styles.turnoRight}>
                            <div className={styles.turnoDate}>
                                <span className={styles.dateLabel}>📆 Fecha</span>
                                <span className={styles.dateValue}>15 Dic, 2024</span>
                            </div>
                            <div className={styles.turnoTime}>
                                <span className={styles.timeLabel}>⏰ Hora</span>
                                <span className={styles.timeValue}>10:30 AM</span>
                            </div>
                            <span className={`${styles.statusBadge} ${styles.pendiente}`}>Pendiente</span>
                        </div>
                    </div>

                    {/* Turno 2 */}
                    <div className={styles.turnoItem}>
                        <div className={styles.turnoLeft}>
                            <div className={styles.turnoIcon}>📱</div>
                            <div className={styles.turnoInfo}>
                                <h3 className={styles.turnoTitle}>Reparación de Celular</h3>
                                <p className={styles.turnoDescription}>Cambio de pantalla</p>
                            </div>
                        </div>
                        <div className={styles.turnoRight}>
                            <div className={styles.turnoDate}>
                                <span className={styles.dateLabel}>📆 Fecha</span>
                                <span className={styles.dateValue}>18 Dic, 2024</span>
                            </div>
                            <div className={styles.turnoTime}>
                                <span className={styles.timeLabel}>⏰ Hora</span>
                                <span className={styles.timeValue}>14:00 PM</span>
                            </div>
                            <span className={`${styles.statusBadge} ${styles.proceso}`}>En Proceso</span>
                        </div>
                    </div>

                    {/* Sin turnos próximos (comentado por defecto)
                    <div className={styles.emptyState}>
                        <div className={styles.emptyIcon}>📭</div>
                        <h3 className={styles.emptyTitle}>No tienes turnos próximos</h3>
                        <p className={styles.emptyDescription}>Solicita un nuevo turno para agendar un servicio</p>
                        <button className={styles.btnEmpty}>Solicitar Turno</button>
                    </div>
                    */}
                </div>
            </div>

            {/* Acciones Rápidas */}
            <div className={styles.quickActions}>
                <h2 className={styles.sectionTitle}>⚡ Acciones Rápidas</h2>
                <div className={styles.actionsGrid}>
                    <div className={styles.actionCard}>
                        <div className={styles.actionIcon}>📅</div>
                        <h3 className={styles.actionTitle}>Nuevo Turno</h3>
                        <p className={styles.actionDescription}>Solicita un nuevo servicio</p>
                        <button className={styles.actionBtn}>Solicitar</button>
                    </div>

                    <div className={styles.actionCard}>
                        <div className={styles.actionIcon}>📋</div>
                        <h3 className={styles.actionTitle}>Mis Turnos</h3>
                        <p className={styles.actionDescription}>Ver todos mis turnos</p>
                        <button className={styles.actionBtn}>Ver</button>
                    </div>

                    <div className={styles.actionCard}>
                        <div className={styles.actionIcon}>👤</div>
                        <h3 className={styles.actionTitle}>Mi Perfil</h3>
                        <p className={styles.actionDescription}>Actualizar mis datos</p>
                        <button className={styles.actionBtn}>Editar</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DashboardUser;
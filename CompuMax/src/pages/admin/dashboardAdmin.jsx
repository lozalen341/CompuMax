import styles from "../../assets/css/Dashboard.module.css";

function DashboardAdmin() {
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
                        <h3 className={styles.statNumber}>12</h3>
                        <p className={styles.statLabel}>Turnos Pendientes</p>
                        <span className={styles.statTrend}>↑ 3 desde ayer</span>
                    </div>
                </div>

                <div className={styles.statCard}>
                    <div className={styles.statIcon} style={{ background: "rgba(59, 130, 246, 0.15)" }}>
                        🔧
                    </div>
                    <div className={styles.statContent}>
                        <h3 className={styles.statNumber}>8</h3>
                        <p className={styles.statLabel}>En Proceso</p>
                        <span className={styles.statTrend}>→ Sin cambios</span>
                    </div>
                </div>

                <div className={styles.statCard}>
                    <div className={styles.statIcon} style={{ background: "rgba(16, 185, 129, 0.15)" }}>
                        ✓
                    </div>
                    <div className={styles.statContent}>
                        <h3 className={styles.statNumber}>45</h3>
                        <p className={styles.statLabel}>Finalizados Hoy</p>
                        <span className={styles.statTrend}>↑ 12 desde ayer</span>
                    </div>
                </div>

                <div className={styles.statCard}>
                    <div className={styles.statIcon} style={{ background: "rgba(16, 185, 129, 0.15)" }}>
                        💰
                    </div>
                    <div className={styles.statContent}>
                        <h3 className={styles.statNumber}>$128K</h3>
                        <p className={styles.statLabel}>Ingresos del Mes</p>
                        <span className={styles.statTrend}>↑ 8% vs mes anterior</span>
                    </div>
                </div>
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

import { useState } from "react";
import styles from "../../assets/css/MisTurnos.module.css";

function MisTurnos() {
    const [filtroEstado, setFiltroEstado] = useState("Todos");
    const [busqueda, setBusqueda] = useState("");

    // Datos de ejemplo - reemplazar con datos reales
    const turnosEjemplo = [
        {
            id: "#T001",
            servicio: "Reparación de PC",
            descripcion: "Mantenimiento preventivo y limpieza",
            fecha: "15/12/2024",
            hora: "10:30 AM",
            estado: "Pendiente",
            icon: "💻"
        },
        {
            id: "#T002",
            servicio: "Reparación de Celular",
            descripcion: "Cambio de pantalla",
            fecha: "18/12/2024",
            hora: "14:00 PM",
            estado: "En Proceso",
            icon: "📱"
        },
        {
            id: "#T003",
            servicio: "Recuperación de Datos",
            descripcion: "Disco duro externo",
            fecha: "10/12/2024",
            hora: "16:00 PM",
            estado: "Finalizado",
            icon: "💾"
        },
        {
            id: "#T004",
            servicio: "Instalación de Software",
            descripcion: "Windows 11 + Drivers",
            fecha: "05/12/2024",
            hora: "11:00 AM",
            estado: "Finalizado",
            icon: "💿"
        }
    ];

    return (
        <main className={styles.mainContent}>
            {/* Header */}
            <div className={styles.contentHeader}>
                <div className={styles.headerLeft}>
                    <h1 className={styles.pageTitle}>📅 Mis Turnos</h1>
                    <p className={styles.pageSubtitle}>Administra tus citas y servicios</p>
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
                <div className={`${styles.statCard} ${styles.statPending}`}>
                    <div className={styles.statIcon}>⏳</div>
                    <div className={styles.statContent}>
                        <h3>2</h3>
                        <p>Pendientes</p>
                    </div>
                </div>

                <div className={`${styles.statCard} ${styles.statProcess}`}>
                    <div className={styles.statIcon}>🔧</div>
                    <div className={styles.statContent}>
                        <h3>1</h3>
                        <p>En Proceso</p>
                    </div>
                </div>

                <div className={`${styles.statCard} ${styles.statCompleted}`}>
                    <div className={styles.statIcon}>✓</div>
                    <div className={styles.statContent}>
                        <h3>2</h3>
                        <p>Finalizados</p>
                    </div>
                </div>

                <div className={`${styles.statCard} ${styles.statTotal}`}>
                    <div className={styles.statIcon}>📋</div>
                    <div className={styles.statContent}>
                        <h3>5</h3>
                        <p>Total</p>
                    </div>
                </div>
            </div>

            {/* Filters Bar */}
            <div className={styles.filtersBar}>
                <div className={styles.searchBox}>
                    <span className={styles.searchIcon}></span>
                    <input
                        type="text"
                        className={styles.searchInput}
                        placeholder="Buscar por servicio..."
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
                        <option>Todos los Estados</option>
                        <option>Pendiente</option>
                        <option>En Proceso</option>
                        <option>Finalizado</option>
                        <option>Cancelado</option>
                    </select>
                </div>
            </div>

            {/* Turnos List */}
            <div className={styles.turnosContainer}>
                <div className={styles.sectionHeader}>
                    <h2 className={styles.sectionTitle}>📋 Lista de Turnos</h2>
                    <span className={styles.totalCount}>{turnosEjemplo.length} turnos en total</span>
                </div>

                {/* Desktop View - Cards */}
                <div className={styles.turnosGrid}>
                    {turnosEjemplo.map((turno) => (
                        <div key={turno.id} className={styles.turnoCard}>
                            <div className={styles.cardHeader}>
                                <div className={styles.cardIcon}>{turno.icon}</div>
                                <span className={`${styles.statusBadge} ${styles[turno.estado.toLowerCase().replace(' ', '-')]}`}>
                                    {turno.estado}
                                </span>
                            </div>

                            <div className={styles.cardBody}>
                                <h3 className={styles.cardTitle}>{turno.servicio}</h3>
                                <p className={styles.cardDescription}>{turno.descripcion}</p>
                                
                                <div className={styles.cardDetails}>
                                    <div className={styles.detailItem}>
                                        <span className={styles.detailIcon}>🆔</span>
                                        <span className={styles.detailText}>{turno.id}</span>
                                    </div>
                                    <div className={styles.detailItem}>
                                        <span className={styles.detailIcon}>📆</span>
                                        <span className={styles.detailText}>{turno.fecha}</span>
                                    </div>
                                    <div className={styles.detailItem}>
                                        <span className={styles.detailIcon}>⏰</span>
                                        <span className={styles.detailText}>{turno.hora}</span>
                                    </div>
                                </div>
                            </div>

                            <div className={styles.cardFooter}>
                                <button className={`${styles.btnAction} ${styles.btnView}`}>
                                    👁️ Ver Detalles
                                </button>
                                {turno.estado === "Pendiente" && (
                                    <button className={`${styles.btnAction} ${styles.btnCancel}`}>
                                        ❌ Cancelar
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Empty State (comentado)
                <div className={styles.emptyState}>
                    <div className={styles.emptyIcon}>📭</div>
                    <h3 className={styles.emptyTitle}>No tienes turnos registrados</h3>
                    <p className={styles.emptyDescription}>Solicita tu primer turno para comenzar</p>
                    <button className={styles.btnEmpty}>Solicitar Turno</button>
                </div>
                */}
            </div>
        </main>
    );
}

export default MisTurnos;
import { useState } from "react";
import styles from "../../assets/css/GestionTurnos.module.css";

// Datos de ejemplo
const turnosEjemplo = [
    {
        id: "#1523",
        cliente: "Juan Pérez",
        servicio: "Reparación de PC",
        fecha: "15/11/2025",
        hora: "10:00 AM",
        estado: "Pendiente",
        descripcion: "Problema con placa madre"
    },
    {
        id: "#1522",
        cliente: "María García",
        servicio: "Mantenimiento",
        fecha: "15/11/2025",
        hora: "11:30 AM",
        estado: "En Proceso",
        descripcion: "Limpieza preventiva anual"
    },
    {
        id: "#1521",
        cliente: "Carlos Rodríguez",
        servicio: "Dispositivos Móviles",
        fecha: "14/11/2025",
        hora: "02:00 PM",
        estado: "Finalizado",
        descripcion: "Cambio de pantalla"
    },
    {
        id: "#1520",
        cliente: "Ana Martínez",
        servicio: "Recuperación de Datos",
        fecha: "14/11/2025",
        hora: "03:30 PM",
        estado: "Pendiente",
        descripcion: "Disco duro dañado"
    },
    {
        id: "#1519",
        cliente: "Luis Fernández",
        servicio: "Reparación de PC",
        fecha: "13/11/2025",
        hora: "09:00 AM",
        estado: "Finalizado",
        descripcion: "Actualización de RAM"
    }
];



function GestionTurnos() {
    const [filtroEstado, setFiltroEstado] = useState("Todos");
    const [filtroServicio, setFiltroServicio] = useState("Todos los servicios");
    const [filtroFecha, setFiltroFecha] = useState("Hoy");
    const [busqueda, setBusqueda] = useState("");

    return (
        <main className={styles.mainContent}>
            {/* Header con degradado */}
            <div className={styles.contentHeader}>
                <div className={styles.headerLeft}>
                    <h1 className={styles.pageTitle}>📅 Gestión de Turnos</h1>
                    <p className={styles.pageSubtitle}>Administra y organiza todas las citas</p>
                </div>
                <div className={styles.headerActions}>
                    <div className={styles.searchBox}>
                        <span className={styles.searchIcon}>🔍</span>
                        <input
                            type="text"
                            className={styles.searchInput}
                            placeholder="Buscar por cliente, servicio..."
                            value={busqueda}
                            onChange={(e) => setBusqueda(e.target.value)}
                        />
                    </div>
                    <button className={styles.btnPrimary}>
                        <span>+</span>
                        <span>Nuevo Turno</span>
                    </button>
                </div>
            </div>

            {/* Stats Grid - Estilo Calendario/Timeline */}
            <div className={styles.statsGrid}>
                <div className={`${styles.statCard} ${styles.statPending}`}>
                    <div className={styles.statIcon}>⏳</div>
                    <div className={styles.statContent}>
                        <h3>12</h3>
                        <p>Turnos Pendientes</p>
                        <span className={styles.statTrend}>↑ 3 desde ayer</span>
                    </div>
                </div>

                <div className={`${styles.statCard} ${styles.statProcess}`}>
                    <div className={styles.statIcon}>🔧</div>
                    <div className={styles.statContent}>
                        <h3>8</h3>
                        <p>En Proceso</p>
                        <span className={styles.statTrend}>→ Sin cambios</span>
                    </div>
                </div>

                <div className={`${styles.statCard} ${styles.statCompleted}`}>
                    <div className={styles.statIcon}>✓</div>
                    <div className={styles.statContent}>
                        <h3>45</h3>
                        <p>Finalizados Hoy</p>
                        <span className={styles.statTrend}>↑ 12 desde ayer</span>
                    </div>
                </div>

                <div className={`${styles.statCard} ${styles.statRevenue}`}>
                    <div className={styles.statIcon}>💰</div>
                    <div className={styles.statContent}>
                        <h3>$128K</h3>
                        <p>Ingresos del Mes</p>
                        <span className={styles.statTrend}>↑ 8% vs mes anterior</span>
                    </div>
                </div>
            </div>

            {/* Filters Bar - Estilo Inline más compacto */}
            <div className={styles.filtersBar}>
                <div className={styles.filterGroup}>
                    <label className={styles.filterLabel}>📊 Estado</label>
                    <select
                        className={styles.filterSelect}
                        value={filtroEstado}
                        onChange={(e) => setFiltroEstado(e.target.value)}
                    >
                        <option>Todos</option>
                        <option>Pendiente</option>
                        <option>En Proceso</option>
                        <option>Finalizado</option>
                        <option>Cancelado</option>
                    </select>
                </div>

                <div className={styles.filterGroup}>
                    <label className={styles.filterLabel}>🛠️ Servicio</label>
                    <select
                        className={styles.filterSelect}
                        value={filtroServicio}
                        onChange={(e) => setFiltroServicio(e.target.value)}
                    >
                        <option>Todos los servicios</option>
                        <option>Reparación de PC</option>
                        <option>Dispositivos Móviles</option>
                        <option>Mantenimiento</option>
                        <option>Recuperación de Datos</option>
                    </select>
                </div>

                <div className={styles.filterGroup}>
                    <label className={styles.filterLabel}>📆 Fecha</label>
                    <select
                        className={styles.filterSelect}
                        value={filtroFecha}
                        onChange={(e) => setFiltroFecha(e.target.value)}
                    >
                        <option>Hoy</option>
                        <option>Esta semana</option>
                        <option>Este mes</option>
                        <option>Personalizado</option>
                    </select>
                </div>

                <button className={styles.btnExport}>📥 Exportar</button>
            </div>

            {/* Data Table - Estilo Timeline */}
            <div className={styles.dataTableContainer}>
                <div className={styles.tableHeader}>
                    <h2 className={styles.tableTitle}>📋 Lista de Turnos</h2>
                    <div className={styles.tableActions}>
                        <button className={styles.btnView}>Vista Calendario</button>
                        <button className={styles.btnView}>Vista Lista</button>
                    </div>
                </div>

                <div className={styles.tableWrapper}>
                    <table className={styles.dataTable}>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Cliente</th>
                                <th>Servicio</th>
                                <th>Fecha</th>
                                <th>Hora</th>
                                <th>Estado</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {turnosEjemplo.map((turno) => (
                                <tr key={turno.id} className={styles.tableRow}>
                                    <td className={styles.idCell}>{turno.id}</td>
                                    <td className={styles.clienteCell}>
                                        <div className={styles.avatar}>{turno.cliente.charAt(0)}</div>
                                        {turno.cliente}
                                    </td>
                                    <td>{turno.servicio}</td>
                                    <td>{turno.fecha}</td>
                                    <td className={styles.horaCell}>{turno.hora}</td>
                                    <td>
                                        <span className={`${styles.statusBadge} ${styles[turno.estado.toLowerCase().replace(' ', '-')]}`}>
                                            {turno.estado}
                                        </span>
                                    </td>
                                    <td>
                                        <div className={styles.actionButtons}>
                                            <button className={`${styles.btnAction} ${styles.btnView}`}>👁️</button>
                                            <button className={`${styles.btnAction} ${styles.btnEdit}`}>✏️</button>
                                            <button className={`${styles.btnAction} ${styles.btnDelete}`}>🗑️</button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className={styles.pagination}>
                    <div className={styles.paginationInfo}>
                        Mostrando 1-5 de 65 turnos
                    </div>
                    <div className={styles.paginationButtons}>
                        <button className={styles.pageBtn} disabled>‹ Anterior</button>
                        <button className={`${styles.pageBtn} ${styles.active}`}>1</button>
                        <button className={styles.pageBtn}>2</button>
                        <button className={styles.pageBtn}>3</button>
                        <button className={styles.pageBtn}>...</button>
                        <button className={styles.pageBtn}>13</button>
                        <button className={styles.pageBtn}>Siguiente ›</button>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default GestionTurnos;
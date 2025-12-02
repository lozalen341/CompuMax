import { useState, useEffect } from "react";
import styles from "../../assets/css/GestionTurnos.module.css";

function GestionTurnos() {
    const [users, setUsers] = useState([]);

    async function handleGetAll() {

        const API_KEY = import.meta.env.VITE_API_KEY;

        try {
            const res = await fetch('http://localhost:3000/turnos/getall', {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    "x-api-key": API_KEY
                },
            });

            const result = await res.json();
            setUsers(result.user);
            console.log(result.user);

        } catch (error) {
            console.log(error);
        }
    }

    const handleDelete = async (e, idTicket) => {
        e.preventDefault();

        const API_KEY = import.meta.env.VITE_API_KEY;

        try {
            const res = await fetch(`http://localhost:3000/turnos/delete/${idTicket}`, {
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json",
                    "x-api-key": API_KEY
                },
            });

            const result = await res.json();
            setUsers(users.filter(t => t.id_ticket !== idTicket));

        } catch (error) {
            console.log(error);
        }
    };


    const [filtroEstado, setFiltroEstado] = useState("Todos");
    const [filtroServicio, setFiltroServicio] = useState("Todos los servicios");
    const [filtroFecha, setFiltroFecha] = useState("Hoy");
    const [busqueda, setBusqueda] = useState("");

    useEffect(() => {
        handleGetAll();
    }, []);

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
                        <span className={styles.searchIcon}></span>
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
                        <h3>1</h3>
                        <p>Turnos Pendientes</p>
                        <span className={styles.statTrend}>↑ 1 desde ayer</span>
                    </div>
                </div>

                <div className={`${styles.statCard} ${styles.statProcess}`}>
                    <div className={styles.statIcon}>🔧</div>
                    <div className={styles.statContent}>
                        <h3>0</h3>
                        <p>En Proceso</p>
                        <span className={styles.statTrend}>→ Sin cambios</span>
                    </div>
                </div>

                <div className={`${styles.statCard} ${styles.statCompleted}`}>
                    <div className={styles.statIcon}>✓</div>
                    <div className={styles.statContent}>
                        <h3>0</h3>
                        <p>Finalizados Hoy</p>
                        <span className={styles.statTrend}>→ Sin cambios</span>
                    </div>
                </div>

                <div className={`${styles.statCard} ${styles.statRevenue}`}>
                    <div className={styles.statIcon}>💰</div>
                    <div className={styles.statContent}>
                        <h3>$0</h3>
                        <p>Ingresos del Mes</p>
                        <span className={styles.statTrend}>→ Sin cambios</span>
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

                {/* Vista Desktop - Tabla */}
                <div className={styles.desktopView}>
                    <div className={styles.tableWrapper}>
                        <table className={styles.dataTable}>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>ID del cliente</th>
                                    <th>Servicio</th>
                                    <th>Fecha</th>
                                    <th>Hora</th>
                                    <th>Estado</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                                <tbody>
                                {users.map((t) => (
                                    <tr key={t.id_ticket}>
                                    <td>{t.id_ticket}</td>
                                    <td>{t.id_user}</td>
                                    <td>{t.description}</td>
                                    <td>{new Date(t.dateCreated).toLocaleDateString()}</td>
                                    <td>{new Date(t.deliveryTime).toLocaleTimeString()}</td>
                                    <td>
                                        <span className={`${styles.statusBadge} ${styles[t.status.replace(' ', '-')]}`}>
                                        {t.status}
                                        </span>
                                    </td>
                                    <td>
                                        <div className={styles.actionButtons}>
                                            <button className={`${styles.btnAction} ${styles.btnView}`} title="Ver">👁️</button>
                                            <button className={`${styles.btnAction} ${styles.btnEdit}`} title="Editar">✏️</button>
                                            <button className={`${styles.btnAction} ${styles.btnDelete}`} title="Eliminar" onClick={(e) => handleDelete(e, t.id_ticket)}>🗑️</button>
                                        </div>
                                    </td>
                                    </tr>
                                ))}
                                </tbody>
                        </table>
                    </div>
                </div>

                {/* Vista Mobile - Cards */}
                <div className={styles.mobileView}>
                {users.map((t) => (
                    <div key={t.id_ticket} className={styles.turnoCard}>
                    <div className={styles.cardHeader}>
                        <div className={styles.cardHeaderLeft}>
                        <div className={styles.avatar}>{t.id_user}</div>
                        <div className={styles.cardInfo}>
                            <h3 className={styles.cardCliente}>{t.description}</h3>
                            <span className={styles.cardId}>{t.id_ticket}</span>
                        </div>
                        </div>
                        <span className={`${styles.statusBadge} ${styles[t.status.replace(' ', '-')]}`}>
                        {t.status}
                        </span>
                    </div>

                    <div className={styles.cardBody}>
                        <div className={styles.cardDetail}>
                        <span className={styles.cardLabel}>📆 Fecha:</span>
                        <span className={styles.cardValue}>{new Date(t.dateCreated).toLocaleDateString()}</span>
                        </div>
                        <div className={styles.cardDetail}>
                        <span className={styles.cardLabel}>⏰ Hora:</span>
                        <span className={styles.cardValue}>{new Date(t.deliveryTime).toLocaleTimeString()}</span>
                        </div>
                    </div>

                    <div className={styles.cardFooter}>
                        <button className={`${styles.btnAction} ${styles.btnView}`} title="Ver">👁️ Ver</button>
                        <button className={`${styles.btnAction} ${styles.btnEdit}`} title="Editar">✏️ Editar</button>
                        <button className={`${styles.btnAction} ${styles.btnDelete}`} title="Eliminar">🗑️ Eliminar</button>
                    </div>
                    </div>
                ))}
                </div>

                <div className={styles.pagination}>
                    <div className={styles.paginationInfo}>
                        Mostrando 1-1 de 1 turno
                    </div>
                    <div className={styles.paginationButtons}>
                        <button className={styles.pageBtn} disabled>‹ Anterior</button>
                        <button className={`${styles.pageBtn} ${styles.active}`}>1</button>
                        <button className={styles.pageBtn} disabled>Siguiente ›</button>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default GestionTurnos;
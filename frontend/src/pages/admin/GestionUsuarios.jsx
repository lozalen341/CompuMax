import { useState } from "react";
import styles from "../../assets/css/GestionUsuarios.module.css";

// Datos de ejemplo
const usuariosEjemplo = [
    {
        id: "#U001",
        nombre: "Juan Pérez",
        email: "juan@mail.com",
        telefono: "+54 11 1234-5678",
        fechaRegistro: "10/01/2024",
        turnosRealizados: 8,
        estado: "Activo"
    },
    {
        id: "#U002",
        nombre: "María García",
        email: "maria@mail.com",
        telefono: "+54 11 2345-6789",
        fechaRegistro: "15/02/2024",
        turnosRealizados: 5,
        estado: "Activo"
    },
    {
        id: "#U003",
        nombre: "Carlos Rodríguez",
        email: "carlos@mail.com",
        telefono: "+54 11 3456-7890",
        fechaRegistro: "20/03/2024",
        turnosRealizados: 12,
        estado: "Activo"
    },
    {
        id: "#U004",
        nombre: "Ana Martínez",
        email: "ana@mail.com",
        telefono: "+54 11 4567-8901",
        fechaRegistro: "05/04/2024",
        turnosRealizados: 3,
        estado: "Inactivo"
    },
    {
        id: "#U005",
        nombre: "Luis Fernández",
        email: "luis@mail.com",
        telefono: "+54 11 5678-9012",
        fechaRegistro: "12/05/2024",
        turnosRealizados: 15,
        estado: "Activo"
    }
];

function GestionUsuarios() {
    const [filtroEstado, setFiltroEstado] = useState("Todos");
    const [filtroFecha, setFiltroFecha] = useState("Último mes");
    const [ordenar, setOrdenar] = useState("Más recientes");
    const [busqueda, setBusqueda] = useState("");
    const [vistaActiva, setVistaActiva] = useState("tabla"); // tabla o cards

    return (
        <main className={styles.mainContent}>
            {/* Header minimalista */}
            <div className={styles.contentHeader}>
                <div className={styles.headerContent}>
                    <div className={styles.titleSection}>
                        <h1 className={styles.pageTitle}>👥 Gestión de Usuarios</h1>
                        <p className={styles.breadcrumb}>Dashboard / Usuarios / Lista</p>
                    </div>
                    <div className={styles.headerActions}>
                        <button className={styles.btnSecondary}>
                            📥 Importar
                        </button>
                        <button className={styles.btnPrimary}>
                            <span>+</span> Nuevo Usuario
                        </button>
                    </div>
                </div>
            </div>

            {/* Stats Grid - Estilo Cards compactos */}
            <div className={styles.statsGrid}>
                <div className={styles.statCard}>
                    <div className={styles.statTop}>
                        <span className={styles.statLabel}>Total Usuarios</span>
                        <span className={styles.statIcon}>👥</span>
                    </div>
                    <h3 className={styles.statValue}>128</h3>
                    <div className={styles.statBottom}>
                        <span className={styles.statChange}>+12%</span>
                        <span className={styles.statPeriod}>vs mes anterior</span>
                    </div>
                </div>

                <div className={styles.statCard}>
                    <div className={styles.statTop}>
                        <span className={styles.statLabel}>Usuarios Activos</span>
                        <span className={styles.statIcon}>✓</span>
                    </div>
                    <h3 className={styles.statValue}>89</h3>
                    <div className={styles.statBottom}>
                        <span className={styles.statChange}>+8%</span>
                        <span className={styles.statPeriod}>este mes</span>
                    </div>
                </div>

                <div className={styles.statCard}>
                    <div className={styles.statTop}>
                        <span className={styles.statLabel}>Nuevos Registros</span>
                        <span className={styles.statIcon}>⭐</span>
                    </div>
                    <h3 className={styles.statValue}>12</h3>
                    <div className={styles.statBottom}>
                        <span className={styles.statChange}>+3</span>
                        <span className={styles.statPeriod}>esta semana</span>
                    </div>
                </div>

                <div className={styles.statCard}>
                    <div className={styles.statTop}>
                        <span className={styles.statLabel}>Con Turnos Pendientes</span>
                        <span className={styles.statIcon}>📅</span>
                    </div>
                    <h3 className={styles.statValue}>23</h3>
                    <div className={styles.statBottom}>
                        <span className={styles.statChange}>-5</span>
                        <span className={styles.statPeriod}>desde ayer</span>
                    </div>
                </div>
            </div>

            {/* Barra de búsqueda y filtros - Estilo horizontal */}
            <div className={styles.searchFilterBar}>
                <div className={styles.searchSection}>
                    <div className={styles.searchBox}>
                        <span className={styles.searchIcon}>🔍</span>
                        <input
                            type="text"
                            className={styles.searchInput}
                            placeholder="Buscar por nombre, email, teléfono..."
                            value={busqueda}
                            onChange={(e) => setBusqueda(e.target.value)}
                        />
                    </div>
                </div>

                <div className={styles.filterSection}>
                    <select
                        className={styles.filterSelect}
                        value={filtroEstado}
                        onChange={(e) => setFiltroEstado(e.target.value)}
                    >
                        <option>📊 Todos los Estados</option>
                        <option>✓ Activo</option>
                        <option>○ Inactivo</option>
                        <option>⊘ Suspendido</option>
                    </select>

                    <select
                        className={styles.filterSelect}
                        value={filtroFecha}
                        onChange={(e) => setFiltroFecha(e.target.value)}
                    >
                        <option>📆 Último mes</option>
                        <option>Última semana</option>
                        <option>Último año</option>
                        <option>Personalizado</option>
                    </select>

                    <select
                        className={styles.filterSelect}
                        value={ordenar}
                        onChange={(e) => setOrdenar(e.target.value)}
                    >
                        <option>↓ Más recientes</option>
                        <option>A-Z Alfabético</option>
                        <option>Más turnos</option>
                    </select>

                    <div className={styles.viewToggle}>
                        <button
                            className={vistaActiva === 'tabla' ? styles.active : ''}
                            onClick={() => setVistaActiva('tabla')}
                        >
                            ☰
                        </button>
                        <button
                            className={vistaActiva === 'cards' ? styles.active : ''}
                            onClick={() => setVistaActiva('cards')}
                        >
                            ▦
                        </button>
                    </div>
                </div>
            </div>

            {/* Data Table - Estilo Clean/Minimalista */}
            <div className={styles.dataTableContainer}>
                <div className={styles.tableHeader}>
                    <div className={styles.tableHeaderLeft}>
                        <h2 className={styles.tableTitle}>Lista de Usuarios</h2>
                        <span className={styles.tableCount}>128 usuarios registrados</span>
                    </div>
                    <div className={styles.tableHeaderRight}>
                        <button className={styles.btnFilter}>🔽 Filtrar Columnas</button>
                        <button className={styles.btnExport}>📤 Exportar CSV</button>
                    </div>
                </div>

                <div className={styles.tableWrapper}>
                    <table className={styles.dataTable}>
                        <thead>
                            <tr>
                                <th><input type="checkbox" /></th>
                                <th>ID</th>
                                <th>Usuario</th>
                                <th>Contacto</th>
                                <th>Registro</th>
                                <th>Actividad</th>
                                <th>Estado</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {usuariosEjemplo.map((usuario) => (
                                <tr key={usuario.id} className={styles.tableRow}>
                                    <td><input type="checkbox" /></td>
                                    <td className={styles.idCell}>{usuario.id}</td>
                                    <td>
                                        <div className={styles.userCell}>
                                            <div className={styles.userAvatar}>
                                                {usuario.nombre.split(' ').map(n => n[0]).join('')}
                                            </div>
                                            <div className={styles.userInfo}>
                                                <span className={styles.userName}>{usuario.nombre}</span>
                                                <span className={styles.userEmail}>{usuario.email}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className={styles.contactInfo}>
                                            <span>📧 {usuario.email}</span>
                                            <span>📱 {usuario.telefono}</span>
                                        </div>
                                    </td>
                                    <td className={styles.dateCell}>{usuario.fechaRegistro}</td>
                                    <td>
                                        <div className={styles.activityCell}>
                                            <span className={styles.turnosCount}>{usuario.turnosRealizados}</span>
                                            <span className={styles.turnosLabel}>turnos</span>
                                        </div>
                                    </td>
                                    <td>
                                        <span className={`${styles.statusBadge} ${styles[usuario.estado.toLowerCase()]}`}>
                                            {usuario.estado}
                                        </span>
                                    </td>
                                    <td>
                                        <div className={styles.actionButtons}>
                                            <button className={styles.btnAction} title="Ver detalles">👁️</button>
                                            <button className={styles.btnAction} title="Editar">✏️</button>
                                            <button className={styles.btnAction} title="Más opciones">⋮</button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination minimalista */}
                <div className={styles.pagination}>
                    <div className={styles.paginationLeft}>
                        <span className={styles.paginationInfo}>Mostrando</span>
                        <select className={styles.paginationSelect}>
                            <option>5</option>
                            <option>10</option>
                            <option>25</option>
                            <option>50</option>
                        </select>
                        <span className={styles.paginationInfo}>de 128 usuarios</span>
                    </div>
                    <div className={styles.paginationRight}>
                        <button className={styles.pageBtn} disabled>‹</button>
                        <button className={`${styles.pageBtn} ${styles.active}`}>1</button>
                        <button className={styles.pageBtn}>2</button>
                        <button className={styles.pageBtn}>3</button>
                        <span className={styles.pageDots}>...</span>
                        <button className={styles.pageBtn}>26</button>
                        <button className={styles.pageBtn}>›</button>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default GestionUsuarios;

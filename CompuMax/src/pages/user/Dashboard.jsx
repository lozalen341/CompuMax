import { useState, useEffect } from "react";
import styles from "../../assets/css/GestionUsuarios.module.css";

function GestionUsuarios() {
    const [usuarios, setUsuarios] = useState([]);
    const [filtroTipo, setFiltroTipo] = useState("Todos");
    const [busqueda, setBusqueda] = useState("");
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState(""); // 'create', 'edit', 'delete', 'changePassword'
    const [selectedUser, setSelectedUser] = useState(null);
    
    // Estados para el formulario
    const [formData, setFormData] = useState({
        nombre: "",
        apellido: "",
        email: "",
        tipo: "user",
        password: "",
        currentPassword: "",
        newPassword: ""
    });

    // Obtener todos los usuarios
    const fetchUsuarios = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:3000/users/getall', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (response.ok) {
                const data = await response.json();
                setUsuarios(data);
            }
        } catch (error) {
            console.error('Error al obtener usuarios:', error);
            alert('Error al cargar usuarios');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsuarios();
    }, []);

    // Crear usuario
    const handleCreateUser = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3000/user/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    nombre: formData.nombre,
                    apellido: formData.apellido,
                    email: formData.email,
                    tipo: formData.tipo,
                    password: formData.password
                })
            });

            if (response.ok) {
                alert('Usuario creado exitosamente');
                setShowModal(false);
                resetForm();
                fetchUsuarios();
            } else {
                const error = await response.json();
                alert(error.message || 'Error al crear usuario');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error al crear usuario');
        }
    };

    // Actualizar usuario
    const handleUpdateUser = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:3000/users/update/${selectedUser.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    nombre: formData.nombre,
                    apellido: formData.apellido,
                    email: formData.email,
                    tipo: formData.tipo
                })
            });

            if (response.ok) {
                alert('Usuario actualizado exitosamente');
                setShowModal(false);
                resetForm();
                fetchUsuarios();
            } else {
                alert('Error al actualizar usuario');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error al actualizar usuario');
        }
    };

    // Cambiar contraseña
    const handleChangePassword = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:3000/users/changePsw/${selectedUser.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    currentPassword: formData.currentPassword,
                    newPassword: formData.newPassword
                })
            });

            if (response.ok) {
                alert('Contraseña actualizada exitosamente');
                setShowModal(false);
                resetForm();
            } else {
                const error = await response.json();
                alert(error.message || 'Error al cambiar contraseña');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error al cambiar contraseña');
        }
    };

    // Eliminar usuario
    const handleDeleteUser = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:3000/users/delete/${selectedUser.id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                alert('Usuario eliminado exitosamente');
                setShowModal(false);
                setSelectedUser(null);
                fetchUsuarios();
            } else {
                alert('Error al eliminar usuario');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error al eliminar usuario');
        }
    };

    // Abrir modal
    const openModal = (type, user = null) => {
        setModalType(type);
        setSelectedUser(user);
        if (user && type === 'edit') {
            setFormData({
                nombre: user.nombre,
                apellido: user.apellido,
                email: user.email,
                tipo: user.tipo,
                password: "",
                currentPassword: "",
                newPassword: ""
            });
        }
        setShowModal(true);
    };

    // Resetear formulario
    const resetForm = () => {
        setFormData({
            nombre: "",
            apellido: "",
            email: "",
            tipo: "user",
            password: "",
            currentPassword: "",
            newPassword: ""
        });
        setSelectedUser(null);
    };

    // Filtrar usuarios
    const usuariosFiltrados = usuarios.filter(user => {
        const matchTipo = filtroTipo === "Todos" || user.tipo === filtroTipo;
        const matchBusqueda = busqueda === "" || 
            user.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
            user.apellido.toLowerCase().includes(busqueda.toLowerCase()) ||
            user.email.toLowerCase().includes(busqueda.toLowerCase());
        return matchTipo && matchBusqueda;
    });

    // Calcular estadísticas
    const totalUsuarios = usuarios.length;
    const totalAdmins = usuarios.filter(u => u.tipo === 'admin').length;
    const totalUsers = usuarios.filter(u => u.tipo === 'user').length;

    return (
        <main className={styles.mainContent}>
            {/* Header */}
            <div className={styles.contentHeader}>
                <div className={styles.headerLeft}>
                    <h1 className={styles.pageTitle}>👥 Gestión de Usuarios</h1>
                    <p className={styles.pageSubtitle}>Administra los usuarios del sistema</p>
                </div>
                <div className={styles.headerActions}>
                    <div className={styles.searchBox}>
                        <span className={styles.searchIcon}>🔍</span>
                        <input
                            type="text"
                            className={styles.searchInput}
                            placeholder="Buscar usuario..."
                            value={busqueda}
                            onChange={(e) => setBusqueda(e.target.value)}
                        />
                    </div>
                    <button className={styles.btnPrimary} onClick={() => openModal('create')}>
                        <span>+</span>
                        <span>Nuevo Usuario</span>
                    </button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className={styles.statsGrid}>
                <div className={`${styles.statCard} ${styles.statTotal}`}>
                    <div className={styles.statIcon}>👥</div>
                    <div className={styles.statContent}>
                        <h3>{totalUsuarios}</h3>
                        <p>Total Usuarios</p>
                    </div>
                </div>

                <div className={`${styles.statCard} ${styles.statAdmin}`}>
                    <div className={styles.statIcon}>⚙️</div>
                    <div className={styles.statContent}>
                        <h3>{totalAdmins}</h3>
                        <p>Administradores</p>
                    </div>
                </div>

                <div className={`${styles.statCard} ${styles.statUser}`}>
                    <div className={styles.statIcon}>👤</div>
                    <div className={styles.statContent}>
                        <h3>{totalUsers}</h3>
                        <p>Usuarios Regulares</p>
                    </div>
                </div>
            </div>

            {/* Filters Bar */}
            <div className={styles.filtersBar}>
                <div className={styles.filterGroup}>
                    <label className={styles.filterLabel}>🏷️ Tipo de Usuario</label>
                    <select
                        className={styles.filterSelect}
                        value={filtroTipo}
                        onChange={(e) => setFiltroTipo(e.target.value)}
                    >
                        <option>Todos</option>
                        <option value="admin">Administrador</option>
                        <option value="user">Usuario Regular</option>
                    </select>
                </div>

                <button className={styles.btnExport} onClick={fetchUsuarios}>
                    🔄 Actualizar
                </button>
            </div>

            {/* Data Table */}
            <div className={styles.dataTableContainer}>
                <div className={styles.tableHeader}>
                    <h2 className={styles.tableTitle}>📋 Lista de Usuarios</h2>
                </div>

                {loading ? (
                    <div className={styles.loadingContainer}>
                        <p>Cargando usuarios...</p>
                    </div>
                ) : (
                    <>
                        {/* Vista Desktop */}
                        <div className={styles.desktopView}>
                            <div className={styles.tableWrapper}>
                                <table className={styles.dataTable}>
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Nombre</th>
                                            <th>Apellido</th>
                                            <th>Email</th>
                                            <th>Tipo</th>
                                            <th>Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {usuariosFiltrados.map((user) => (
                                            <tr key={user.id} className={styles.tableRow}>
                                                <td className={styles.idCell}>#{user.id}</td>
                                                <td className={styles.nombreCell}>
                                                    <div className={styles.userInfo}>
                                                        <div className={styles.avatar}>
                                                            {user.nombre.charAt(0)}{user.apellido.charAt(0)}
                                                        </div>
                                                        <span>{user.nombre}</span>
                                                    </div>
                                                </td>
                                                <td>{user.apellido}</td>
                                                <td className={styles.emailCell}>{user.email}</td>
                                                <td>
                                                    <span className={`${styles.typeBadge} ${styles[user.tipo]}`}>
                                                        {user.tipo === 'admin' ? '⚙️ Admin' : '👤 Usuario'}
                                                    </span>
                                                </td>
                                                <td>
                                                    <div className={styles.actionButtons}>
                                                        <button 
                                                            className={`${styles.btnAction} ${styles.btnEdit}`}
                                                            onClick={() => openModal('edit', user)}
                                                            title="Editar"
                                                        >
                                                            ✏️
                                                        </button>
                                                        <button 
                                                            className={`${styles.btnAction} ${styles.btnPassword}`}
                                                            onClick={() => openModal('changePassword', user)}
                                                            title="Cambiar Contraseña"
                                                        >
                                                            🔒
                                                        </button>
                                                        <button 
                                                            className={`${styles.btnAction} ${styles.btnDelete}`}
                                                            onClick={() => openModal('delete', user)}
                                                            title="Eliminar"
                                                        >
                                                            🗑️
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Vista Mobile */}
                        <div className={styles.mobileView}>
                            {usuariosFiltrados.map((user) => (
                                <div key={user.id} className={styles.userCard}>
                                    <div className={styles.cardHeader}>
                                        <div className={styles.cardHeaderLeft}>
                                            <div className={styles.avatar}>
                                                {user.nombre.charAt(0)}{user.apellido.charAt(0)}
                                            </div>
                                            <div className={styles.cardInfo}>
                                                <h3 className={styles.cardNombre}>{user.nombre} {user.apellido}</h3>
                                                <span className={styles.cardId}>#{user.id}</span>
                                            </div>
                                        </div>
                                        <span className={`${styles.typeBadge} ${styles[user.tipo]}`}>
                                            {user.tipo === 'admin' ? '⚙️ Admin' : '👤 Usuario'}
                                        </span>
                                    </div>
                                    
                                    <div className={styles.cardBody}>
                                        <div className={styles.cardDetail}>
                                            <span className={styles.cardLabel}>📧 Email:</span>
                                            <span className={styles.cardValue}>{user.email}</span>
                                        </div>
                                    </div>

                                    <div className={styles.cardFooter}>
                                        <button 
                                            className={`${styles.btnAction} ${styles.btnEdit}`}
                                            onClick={() => openModal('edit', user)}
                                        >
                                            ✏️ Editar
                                        </button>
                                        <button 
                                            className={`${styles.btnAction} ${styles.btnPassword}`}
                                            onClick={() => openModal('changePassword', user)}
                                        >
                                            🔒 Contraseña
                                        </button>
                                        <button 
                                            className={`${styles.btnAction} ${styles.btnDelete}`}
                                            onClick={() => openModal('delete', user)}
                                        >
                                            🗑️ Eliminar
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>

            {/* Modal */}
            {showModal && (
                <div className={styles.modalOverlay} onClick={() => setShowModal(false)}>
                    <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                        <div className={styles.modalHeader}>
                            <h2>
                                {modalType === 'create' && '➕ Crear Nuevo Usuario'}
                                {modalType === 'edit' && '✏️ Editar Usuario'}
                                {modalType === 'changePassword' && '🔒 Cambiar Contraseña'}
                                {modalType === 'delete' && '🗑️ Eliminar Usuario'}
                            </h2>
                            <button className={styles.closeBtn} onClick={() => setShowModal(false)}>✕</button>
                        </div>

                        <div className={styles.modalBody}>
                            {modalType === 'delete' ? (
                                <div className={styles.deleteConfirm}>
                                    <p>¿Estás seguro de que deseas eliminar a <strong>{selectedUser?.nombre} {selectedUser?.apellido}</strong>?</p>
                                    <p className={styles.warning}>Esta acción no se puede deshacer.</p>
                                    <div className={styles.deleteActions}>
                                        <button className={styles.btnCancel} onClick={() => setShowModal(false)}>
                                            Cancelar
                                        </button>
                                        <button className={styles.btnConfirmDelete} onClick={handleDeleteUser}>
                                            Eliminar Usuario
                                        </button>
                                    </div>
                                </div>
                            ) : modalType === 'changePassword' ? (
                                <form onSubmit={handleChangePassword}>
                                    <div className={styles.formGroup}>
                                        <label>Contraseña Actual</label>
                                        <input
                                            type="password"
                                            value={formData.currentPassword}
                                            onChange={(e) => setFormData({...formData, currentPassword: e.target.value})}
                                            required
                                        />
                                    </div>
                                    <div className={styles.formGroup}>
                                        <label>Nueva Contraseña</label>
                                        <input
                                            type="password"
                                            value={formData.newPassword}
                                            onChange={(e) => setFormData({...formData, newPassword: e.target.value})}
                                            required
                                        />
                                    </div>
                                    <div className={styles.formActions}>
                                        <button type="button" className={styles.btnCancel} onClick={() => setShowModal(false)}>
                                            Cancelar
                                        </button>
                                        <button type="submit" className={styles.btnSubmit}>
                                            Cambiar Contraseña
                                        </button>
                                    </div>
                                </form>
                            ) : (
                                <form onSubmit={modalType === 'create' ? handleCreateUser : handleUpdateUser}>
                                    <div className={styles.formRow}>
                                        <div className={styles.formGroup}>
                                            <label>Nombre</label>
                                            <input
                                                type="text"
                                                value={formData.nombre}
                                                onChange={(e) => setFormData({...formData, nombre: e.target.value})}
                                                required
                                            />
                                        </div>
                                        <div className={styles.formGroup}>
                                            <label>Apellido</label>
                                            <input
                                                type="text"
                                                value={formData.apellido}
                                                onChange={(e) => setFormData({...formData, apellido: e.target.value})}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className={styles.formGroup}>
                                        <label>Email</label>
                                        <input
                                            type="email"
                                            value={formData.email}
                                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                                            required
                                        />
                                    </div>
                                    <div className={styles.formGroup}>
                                        <label>Tipo de Usuario</label>
                                        <select
                                            value={formData.tipo}
                                            onChange={(e) => setFormData({...formData, tipo: e.target.value})}
                                            required
                                        >
                                            <option value="user">Usuario Regular</option>
                                            <option value="admin">Administrador</option>
                                        </select>
                                    </div>
                                    {modalType === 'create' && (
                                        <div className={styles.formGroup}>
                                            <label>Contraseña</label>
                                            <input
                                                type="password"
                                                value={formData.password}
                                                onChange={(e) => setFormData({...formData, password: e.target.value})}
                                                required
                                            />
                                        </div>
                                    )}
                                    <div className={styles.formActions}>
                                        <button type="button" className={styles.btnCancel} onClick={() => setShowModal(false)}>
                                            Cancelar
                                        </button>
                                        <button type="submit" className={styles.btnSubmit}>
                                            {modalType === 'create' ? 'Crear Usuario' : 'Actualizar Usuario'}
                                        </button>
                                    </div>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
}

export default GestionUsuarios;
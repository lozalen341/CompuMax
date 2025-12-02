import { useState } from "react";
import styles from "../../assets/css/MiPerfil.module.css";

function MiPerfil() {
    const [activeTab, setActiveTab] = useState("datos");
    
    // Datos de ejemplo - reemplazar con datos reales del usuario
    const [userData, setUserData] = useState({
        nombre: "Juan",
        apellido: "Pérez",
        email: "juan.perez@ejemplo.com",
        telefono: "+54 11 1234-5678",
        direccion: "Av. Ejemplo 123, CABA"
    });

    const [passwordData, setPasswordData] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
    });

    const handleUserDataChange = (e) => {
        setUserData({
            ...userData,
            [e.target.name]: e.target.value
        });
    };

    const handlePasswordChange = (e) => {
        setPasswordData({
            ...passwordData,
            [e.target.name]: e.target.value
        });
    };

    const handleSaveProfile = (e) => {
        e.preventDefault();
        console.log("Guardar perfil:", userData);
        // Aquí irá la lógica para actualizar en el backend
    };

    const handleChangePassword = (e) => {
        e.preventDefault();
        console.log("Cambiar contraseña");
        // Aquí irá la lógica para cambiar contraseña
    };

    return (
        <main className={styles.mainContent}>
            {/* Header */}
            <div className={styles.contentHeader}>
                <div className={styles.headerLeft}>
                    <h1 className={styles.pageTitle}>👤 Mi Perfil</h1>
                    <p className={styles.pageSubtitle}>Administra tu información personal</p>
                </div>
            </div>

            {/* Profile Card */}
            <div className={styles.profileCard}>
                <div className={styles.profileHeader}>
                    <div className={styles.avatarSection}>
                        <div className={styles.avatar}>
                            {userData.nombre.charAt(0)}{userData.apellido.charAt(0)}
                        </div>
                        <div className={styles.avatarInfo}>
                            <h2 className={styles.userName}>{userData.nombre} {userData.apellido}</h2>
                            <p className={styles.userEmail}>{userData.email}</p>
                        </div>
                    </div>
                    <div className={styles.userStats}>
                        <div className={styles.statItem}>
                            <span className={styles.statValue}>11</span>
                            <span className={styles.statLabel}>Turnos</span>
                        </div>
                        <div className={styles.statItem}>
                            <span className={styles.statValue}>3</span>
                            <span className={styles.statLabel}>Pendientes</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div className={styles.tabsContainer}>
                <div className={styles.tabs}>
                    <button
                        className={`${styles.tab} ${activeTab === "datos" ? styles.active : ""}`}
                        onClick={() => setActiveTab("datos")}
                    >
                        📝 Datos Personales
                    </button>
                    <button
                        className={`${styles.tab} ${activeTab === "seguridad" ? styles.active : ""}`}
                        onClick={() => setActiveTab("seguridad")}
                    >
                        🔒 Seguridad
                    </button>
                </div>

                {/* Tab Content: Datos Personales */}
                {activeTab === "datos" && (
                    <div className={styles.tabContent}>
                        <form onSubmit={handleSaveProfile} className={styles.form}>
                            <div className={styles.formSection}>
                                <h3 className={styles.formSectionTitle}>Información Personal</h3>
                                
                                <div className={styles.formRow}>
                                    <div className={styles.formGroup}>
                                        <label className={styles.formLabel}>Nombre *</label>
                                        <input
                                            type="text"
                                            name="nombre"
                                            className={styles.formInput}
                                            value={userData.nombre}
                                            onChange={handleUserDataChange}
                                            required
                                        />
                                    </div>

                                    <div className={styles.formGroup}>
                                        <label className={styles.formLabel}>Apellido *</label>
                                        <input
                                            type="text"
                                            name="apellido"
                                            className={styles.formInput}
                                            value={userData.apellido}
                                            onChange={handleUserDataChange}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className={styles.formGroup}>
                                    <label className={styles.formLabel}>Email *</label>
                                    <input
                                        type="email"
                                        name="email"
                                        className={styles.formInput}
                                        value={userData.email}
                                        onChange={handleUserDataChange}
                                        required
                                    />
                                </div>

                                <div className={styles.formGroup}>
                                    <label className={styles.formLabel}>Teléfono</label>
                                    <input
                                        type="tel"
                                        name="telefono"
                                        className={styles.formInput}
                                        value={userData.telefono}
                                        onChange={handleUserDataChange}
                                        placeholder="+54 11 1234-5678"
                                    />
                                </div>

                                <div className={styles.formGroup}>
                                    <label className={styles.formLabel}>Dirección</label>
                                    <input
                                        type="text"
                                        name="direccion"
                                        className={styles.formInput}
                                        value={userData.direccion}
                                        onChange={handleUserDataChange}
                                        placeholder="Calle, número, ciudad"
                                    />
                                </div>
                            </div>

                            <div className={styles.formActions}>
                                <button type="button" className={styles.btnSecondary}>
                                    Cancelar
                                </button>
                                <button type="submit" className={styles.btnPrimary}>
                                    ✓ Guardar Cambios
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                {/* Tab Content: Seguridad */}
                {activeTab === "seguridad" && (
                    <div className={styles.tabContent}>
                        <form onSubmit={handleChangePassword} className={styles.form}>
                            <div className={styles.formSection}>
                                <h3 className={styles.formSectionTitle}>Cambiar Contraseña</h3>
                                
                                <div className={styles.infoBox}>
                                    <div className={styles.infoIcon}>🔒</div>
                                    <div className={styles.infoContent}>
                                        <h4 className={styles.infoTitle}>Requisitos de Contraseña</h4>
                                        <ul className={styles.infoList}>
                                            <li>Mínimo 8 caracteres</li>
                                            <li>Al menos una letra mayúscula</li>
                                            <li>Al menos un número</li>
                                            <li>Al menos un carácter especial (!@#$%)</li>
                                        </ul>
                                    </div>
                                </div>

                                <div className={styles.formGroup}>
                                    <label className={styles.formLabel}>Contraseña Actual *</label>
                                    <input
                                        type="password"
                                        name="currentPassword"
                                        className={styles.formInput}
                                        value={passwordData.currentPassword}
                                        onChange={handlePasswordChange}
                                        required
                                        placeholder="Ingresa tu contraseña actual"
                                    />
                                </div>

                                <div className={styles.formGroup}>
                                    <label className={styles.formLabel}>Nueva Contraseña *</label>
                                    <input
                                        type="password"
                                        name="newPassword"
                                        className={styles.formInput}
                                        value={passwordData.newPassword}
                                        onChange={handlePasswordChange}
                                        required
                                        placeholder="Ingresa tu nueva contraseña"
                                    />
                                </div>

                                <div className={styles.formGroup}>
                                    <label className={styles.formLabel}>Confirmar Nueva Contraseña *</label>
                                    <input
                                        type="password"
                                        name="confirmPassword"
                                        className={styles.formInput}
                                        value={passwordData.confirmPassword}
                                        onChange={handlePasswordChange}
                                        required
                                        placeholder="Confirma tu nueva contraseña"
                                    />
                                </div>
                            </div>

                            <div className={styles.formActions}>
                                <button type="button" className={styles.btnSecondary}>
                                    Cancelar
                                </button>
                                <button type="submit" className={styles.btnPrimary}>
                                    🔒 Cambiar Contraseña
                                </button>
                            </div>
                        </form>

                        {/* Account Actions */}
                        <div className={styles.dangerZone}>
                            <h3 className={styles.dangerZoneTitle}>⚠️ Zona de Peligro</h3>
                            <div className={styles.dangerZoneContent}>
                                <div className={styles.dangerZoneItem}>
                                    <div>
                                        <h4 className={styles.dangerZoneItemTitle}>Desactivar Cuenta</h4>
                                        <p className={styles.dangerZoneItemDescription}>
                                            Tu cuenta será desactivada temporalmente. Podrás reactivarla en cualquier momento.
                                        </p>
                                    </div>
                                    <button className={styles.btnWarning}>Desactivar</button>
                                </div>
                                
                                <div className={styles.dangerZoneItem}>
                                    <div>
                                        <h4 className={styles.dangerZoneItemTitle}>Eliminar Cuenta</h4>
                                        <p className={styles.dangerZoneItemDescription}>
                                            Esta acción es permanente y no se puede deshacer. Todos tus datos serán eliminados.
                                        </p>
                                    </div>
                                    <button className={styles.btnDanger}>Eliminar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
}

export default MiPerfil;
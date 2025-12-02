import { useState, useEffect } from "react";
import styles from "../../assets/css/MiPerfil.module.css";

const API_URL = "http://localhost:3000"; // Ajusta según tu configuración

function MiPerfil() {
    const id = localStorage.getItem('userId');
    const [activeTab, setActiveTab] = useState("datos");
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    
    const [userData, setUserData] = useState({
        name: "",
        lastname: "",
        email: "",
        phone: "",
        address: "",
        tickets: 0,
        ticketsPending: 0
    });

    const [passwordData, setPasswordData] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
    });

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const API_KEY = import.meta.env.VITE_API_KEY
                const res = await fetch(`${API_URL}/user/getById/${id}`, {
                    method: 'GET',
                    headers: {
                        "Content-Type": "application/json",
                        "x-api-key": API_KEY
                    }
                });

                const tickets = await fetch(`${API_URL}/turnos/getById/${id}`, {
                    method: 'GET',
                    headers: {
                        "Content-Type": "application/json",
                        "x-api-key": API_KEY
                    }
                });

                const ticketData = await tickets.json();

                const data = await res.json();
                
                if (data.ok) {
                    setUserData({
                        name: data.user[0].name || "",
                        lastname: data.user[0].lastname || "",
                        email: data.user[0].email || "",
                        phone: data.user[0].phone || "",
                        address: data.user[0].address || "",
                        tickets: ticketData.user.length,
                        ticketsPending: ticketData.user.filter(ticket => ticket.status === "pendiente").length
                    });
                }
            } catch (error) {
                console.error("Error al cargar los datos del usuario:", error);
                setError("Error al cargar los datos del usuario. Por favor, intente nuevamente.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchUserData();
    }, [id]);

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

    const handleSaveProfile = async (e) => {
        e.preventDefault();
        try {
            const API_KEY = import.meta.env.VITE_API_KEY;
            const token = localStorage.getItem('token');
            
            const response = await fetch(`${API_URL}/user/update/${id}`, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json",
                    "x-api-key": API_KEY,
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    name: userData.name,
                    lastname: userData.lastname,
                    email: userData.email,
                    phone: userData.phone,
                    address: userData.address
                })
            });

            const data = await response.json();

            if (response.ok) {
                // Actualizar los datos locales con la respuesta del servidor
                setUserData(prev => ({
                    ...prev,
                    name: data.user.name || prev.name,
                    lastname: data.user.lastname || prev.lastname,
                    email: data.user.email || prev.email,
                    phone: data.user.phone || prev.phone,
                    address: data.user.address || prev.address
                }));
                
                // Mostrar mensaje de éxito
                alert("Perfil actualizado correctamente");
            } else {
                // Mostrar mensaje de error
                throw new Error(data.message || "Error al actualizar el perfil");
            }
        } catch (error) {
            console.error("Error al actualizar el perfil:", error);
            alert(error.message || "Error al actualizar el perfil. Por favor, intente nuevamente.");
        }
    };

    const handleChangePassword = async (e) => {
        e.preventDefault();
        
        // Validar que las contraseñas coincidan
        if (passwordData.newPassword !== passwordData.confirmPassword) {
            alert("Las contraseñas no coinciden");
            return;
        }

        try {
            const API_KEY = import.meta.env.VITE_API_KEY;
            const token = localStorage.getItem('token');
            
            const response = await fetch(`${API_URL}/user/changePsw/${id}`, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json",
                    "x-api-key": API_KEY,
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    currentPassword: passwordData.currentPassword,
                    newPassword: passwordData.newPassword
                })
            });

            const data = await response.json();

            if (response.ok) {
                // Limpiar el formulario
                setPasswordData({
                    currentPassword: "",
                    newPassword: "",
                    confirmPassword: ""
                });
                
                // Mostrar mensaje de éxito
                alert("Contraseña actualizada correctamente");
            } else {
                // Mostrar mensaje de error específico si está disponible
                const errorMessage = data.message || "Error al actualizar la contraseña";
                throw new Error(errorMessage);
            }
        } catch (error) {
            console.error("Error al cambiar la contraseña:", error);
            alert(error.message || "Error al cambiar la contraseña. Por favor, intente nuevamente.");
        }
    };

    if (isLoading) {
        return <div className={styles.loading}>Cargando datos del perfil...</div>;
    }

    if (error) {
        return <div className={styles.error}>{error}</div>;
    }

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
                            {userData.name.charAt(0)}{userData.lastname.charAt(0)}
                        </div>
                        <div className={styles.avatarInfo}>
                            <h2 className={styles.userName}>{userData.name} {userData.lastname}</h2>
                            <p className={styles.userEmail}>{userData.email}</p>
                        </div>
                    </div>
                    <div className={styles.userStats}>
                        <div className={styles.statItem}>
                            <span className={styles.statValue}>{userData.tickets}</span>
                            <span className={styles.statLabel}>Turnos</span>
                        </div>
                        <div className={styles.statItem}>
                            <span className={styles.statValue}>{userData.ticketsPending}</span>
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
                        <form onSubmit={handleSaveProfile} className={styles.profileForm}>
                            <div className={styles.formGroup}>
                                <label htmlFor="name">Nombre</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={userData.name}
                                    onChange={handleUserDataChange}
                                    className={styles.formControl}
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label htmlFor="lastname">Apellido</label>
                                <input
                                    type="text"
                                    id="lastname"
                                    name="lastname"
                                    value={userData.lastname}
                                    onChange={handleUserDataChange}
                                    className={styles.formControl}
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label htmlFor="email">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={userData.email}
                                    onChange={handleUserDataChange}
                                    className={styles.formControl}
                                    disabled
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label htmlFor="phone">Teléfono</label>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    value={userData.phone}
                                    onChange={handleUserDataChange}
                                    className={styles.formControl}
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label htmlFor="address">Dirección</label>
                                <textarea
                                    id="address"
                                    name="address"
                                    value={userData.address}
                                    onChange={handleUserDataChange}
                                    className={styles.formControl}
                                    rows="3"
                                ></textarea>
                            </div>
                            <div className={styles.formActions}>
                                <button type="submit" className={styles.btnPrimary}>
                                    Guardar Cambios
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                {/* Tab Content: Seguridad */}
                {activeTab === "seguridad" && (
                    <div className={styles.tabContent}>
                        <form onSubmit={handleChangePassword} className={styles.profileForm}>
                            <div className={styles.formGroup}>
                                <label htmlFor="currentPassword">Contraseña Actual</label>
                                <input
                                    type="password"
                                    id="currentPassword"
                                    name="currentPassword"
                                    value={passwordData.currentPassword}
                                    onChange={handlePasswordChange}
                                    className={styles.formControl}
                                    required
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label htmlFor="newPassword">Nueva Contraseña</label>
                                <input
                                    type="password"
                                    id="newPassword"
                                    name="newPassword"
                                    value={passwordData.newPassword}
                                    onChange={handlePasswordChange}
                                    className={styles.formControl}
                                    required
                                />
                            </div>
                            <div className={styles.formGroup}>
                                <label htmlFor="confirmPassword">Confirmar Nueva Contraseña</label>
                                <input
                                    type="password"
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    value={passwordData.confirmPassword}
                                    onChange={handlePasswordChange}
                                    className={styles.formControl}
                                    required
                                />
                            </div>
                            <div className={styles.formActions}>
                                <button type="submit" className={styles.btnPrimary}>
                                    Cambiar Contraseña
                                </button>
                            </div>
                        </form>
                    </div>
                )}
            </div>
        </main>
    );
}

export default MiPerfil;

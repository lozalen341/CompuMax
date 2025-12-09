import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../assets/css/SideBar.css";

function SideBar() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const navigate = useNavigate();

    const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
    const closeSidebar = () => setSidebarOpen(false);

    const handleLogout = async () => {
        try {
            const API_KEY = import.meta.env.VITE_API_KEY;
            const token = localStorage.getItem('token');

            const response = await fetch('http://localhost:3000/user/logout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-key': API_KEY,
                    'Authorization': `Bearer ${token}`
                }
            });
            let result = null;
            try {
                result = await response.json();
            } catch (err) {
                result = { error: 'Respuesta no JSON del servidor' };
            }

            if (response.ok) {
                // Limpiar el almacenamiento local
                localStorage.removeItem('token');
                localStorage.removeItem('userType');
                localStorage.removeItem('userId');

                // Redirigir a la página de inicio de sesión
                navigate('/login');
            } else {
                console.error('Error al cerrar sesión:', result?.error || 'Error desconocido');
            }
        } catch (error) {
            console.error('Error al cerrar sesión:', error);
            // Aún así, limpiar el almacenamiento y redirigir
            localStorage.removeItem('token');
            localStorage.removeItem('userType');
            localStorage.removeItem('userId');
            navigate('/login');
        }
    };

    return (
        <>
            {/* Overlay - fuera del sidebar */}
            <div className={`overlay ${sidebarOpen ? 'active' : ''}`} onClick={closeSidebar}></div>

            {/* Mobile Header - FUERA del sidebar */}
            <div className="mobileHeader">
                <button className="menuBtn" onClick={toggleSidebar}>☰</button>
                <div className="mobileLogo">CompuMax</div>
                <div style={{ width: '40px' }}></div>
            </div>

            {/* Sidebar - solo el menú lateral */}
            <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
                <div className="sidebarHeader">
                    <div className="sidebarLogo">CompuMax</div>
                    <div className="sidebarRole">Panel de Administrador</div>
                </div>

                <nav className="sidebarNav">
                    <NavLink
                        to="/admin"
                        className={({ isActive }) => "navItem" + (isActive ? " active" : "")}
                        onClick={closeSidebar}
                    >
                        <span className="navIcon"></span>
                        <span>Dashboard</span>
                    </NavLink>

                    <NavLink
                        to="/admin/turnos"
                        end
                        className={({ isActive }) => "navItem" + (isActive ? " active" : "")}
                        onClick={closeSidebar}
                    >
                        <span className="navIcon"></span>
                        <span>Gestión de Turnos</span>
                    </NavLink>

                    <NavLink
                        to="/admin/usuarios"
                        className={({ isActive }) => "navItem" + (isActive ? " active" : "")}
                        onClick={closeSidebar}
                    >
                        <span className="navIcon"></span>
                        <span>Gestión de Usuarios</span>
                    </NavLink>

                    {/* Otros enlaces comentados */}
                    {/* <NavLink to="/servicios" className="navItem" onClick={closeSidebar}>
                        <span className="navIcon">🔧</span>
                        <span>Servicios</span>
                    </NavLink>

                    <NavLink to="/reportes" className="navItem" onClick={closeSidebar}>
                        <span className="navIcon">📈</span>
                        <span>Reportes</span>
                    </NavLink>

                    <NavLink to="/configuracion" className="navItem" onClick={closeSidebar}>
                        <span className="navIcon">⚙️</span>
                        <span>Configuración</span>
                    </NavLink> */}
                </nav>

                <div className="sidebarFooter">
                    <button className="logoutBtn" onClick={handleLogout}>Cerrar Sesión</button>
                </div>
            </aside>
        </>
    );
}

export default SideBar;
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
            
            const response = await fetch('http://localhost:3000/users/logout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-key': API_KEY,
                    'Authorization': `Bearer ${token}`
                }
            });

            const result = await response.json();
            
            if (response.ok) {
                // Limpiar el almacenamiento local
                localStorage.removeItem('token');
                localStorage.removeItem('userType');
                localStorage.removeItem('userId');
                
                // Redirigir a la página de inicio de sesión
                navigate('/login');
            } else {
                console.error('Error al cerrar sesión:', result.error);
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
            {/* Overlay */}
            <div className={`overlay ${sidebarOpen ? 'active' : ''}`} onClick={closeSidebar}></div>

            {/* Mobile Header */}
            <div className="mobileHeader">
                <button className="menuBtn" onClick={toggleSidebar}>☰</button>
                <div className="mobileLogo">CompuMax</div>
                <div style={{ width: '40px' }}></div>
            </div>

            {/* Sidebar */}
            <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
                <div className="sidebarHeader">
                    <div className="sidebarLogo">CompuMax</div>
                    <div className="sidebarRole">Panel de Usuario</div>
                </div>

                <nav className="sidebarNav">
                    <NavLink
                        to="/user"
                        className={({ isActive }) => "navItem" + (isActive ? " active" : "")}
                        onClick={closeSidebar}
                    >
                        <span className="navIcon">📊</span>
                        <span>Dashboard</span>
                    </NavLink>

                    <NavLink
                        to="/user/mis-turnos"
                        className={({ isActive }) => "navItem" + (isActive ? " active" : "")}
                        onClick={closeSidebar}
                    >
                        <span className="navIcon">📅</span>
                        <span>Mis Turnos</span>
                    </NavLink>

                    <NavLink
                        to="/user/nuevo-turno"
                        className={({ isActive }) => "navItem" + (isActive ? " active" : "")}
                        onClick={closeSidebar}
                    >
                        <span className="navIcon">➕</span>
                        <span>Solicitar Turno</span>
                    </NavLink>

                    <NavLink
                        to="/user/mi-perfil"
                        className={({ isActive }) => "navItem" + (isActive ? " active" : "")}
                        onClick={closeSidebar}
                    >
                        <span className="navIcon">👤</span>
                        <span>Mi Perfil</span>
                    </NavLink>
                </nav>

                <div className="sidebarFooter">
                    <button className="logoutBtn" onClick={handleLogout}>Cerrar Sesión</button>
                </div>
            </aside>
        </>
    );
}

export default SideBar;

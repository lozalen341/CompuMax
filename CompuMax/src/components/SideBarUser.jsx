import { useState } from "react";
import { NavLink } from "react-router-dom";
import "../assets/css/SideBar.css";

function SideBar() {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
    const closeSidebar = () => setSidebarOpen(false);

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
                    <button className="logoutBtn">Cerrar Sesión</button>
                </div>
            </aside>
        </>
    );
}

export default SideBar;
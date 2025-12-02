import { useState } from "react";
import { NavLink } from "react-router-dom";
import "../assets/css/SideBar.css";

function SideBar() {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
    const closeSidebar = () => setSidebarOpen(false);

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
                    <button className="logoutBtn">Cerrar Sesión</button>
                </div>
            </aside>
        </>
    );
}

export default SideBar;
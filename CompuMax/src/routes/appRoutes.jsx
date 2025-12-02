import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

// Páginas públicas
import LandingPage from '../pages/LandingPage';
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';

// Layouts
import AdminLayout from '../pages/layouts/AdminLayout';
import UserLayout from '../pages/layouts/UserLayout';

// Secciones admin
import DashboardAdmin from '../pages/admin/dashboardAdmin';
import GestionTurnos from '../pages/admin/GestionTurnos';
import GestionUsuarios from '../pages/admin/GestionUsuarios';

// secciones User
import DashboardUser from '../pages/user/DashboardUser';
import MisTurnos from '../pages/user/MisTurnos';
import NuevoTurno from '../pages/user/NuevoTurno';
import Perfil from '../pages/user/Perfil';


export default function AppRouter() {
    const location = useLocation();

    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>

                {/* Públicas */}
                <Route path="/" element={<LandingPage/>} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/* Admin */}
                <Route path="/admin" element={<AdminLayout />}>
                    {/* dashboard */}
                    <Route index element={<DashboardAdmin />} />

                    {/* gestion de turnos */}
                    <Route path="turnos" element={<GestionTurnos />} />

                    {/* gestion de usuarios */}
                    <Route path="usuarios" element={<GestionUsuarios />} />
                </Route>

                {/* User */}
                <Route path="/user" element={<UserLayout />}>
                    {/* dashboard */}
                    <Route index element={<DashboardUser />} />

                    {/* mis turnos */}
                    <Route path="mis-turnos" element={<MisTurnos />} />

                    {/* nuevo turno */}
                    <Route path="nuevo-turno" element={<NuevoTurno />} />

                    {/* Perfil de usuario */}
                    <Route path="mi-perfil" element={<Perfil />} />

                </Route>
            </Routes>
        </AnimatePresence>
    );
}

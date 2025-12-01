import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

// Páginas públicas
import LandingPage from '../pages/LandingPage';
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';

// Layout admin
import AdminLayout from '../pages/layouts/AdminLayout';

// Secciones admin
import Dashboard from '../pages/admin/dashboard';
import GestionTurnos from '../pages/admin/GestionTurnos';
import GestionUsuarios from '../pages/admin/GestionUsuarios';

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
                    <Route index element={<Dashboard />} />

                    {/* gestion de turnos */}
                    <Route path="turnos" element={<GestionTurnos />} />

                    {/* gestion de usuarios */}
                    <Route path="usuarios" element={<GestionUsuarios />} />
                    
                </Route>

            </Routes>
        </AnimatePresence>
    );
}

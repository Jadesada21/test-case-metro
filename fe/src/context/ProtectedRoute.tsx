import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthContext";
import Loading from "../components/Loading";
import type { ProtectedRouteRole } from "../types/protected-route.type";


export default function ProtectedRoute({
    role
}: ProtectedRouteRole) {
    const { user, loading } = useAuth()

    if (loading) {
        return <Loading />
    }

    if (!user) {
        return <Navigate to="/auth/login" replace />
    }

    if (role && user.role !== role) {
        return <Navigate to="/blogs" replace />
    }

    return <Outlet />
}


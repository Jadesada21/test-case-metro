import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthContext";
import Loading from "../components/Loading";


export default function ProtectedRoute() {
    const { user, loading } = useAuth()

    if (loading) {
        return <Loading />
    }

    if (!user) {
        return <Navigate to="/auth/login" replace />
    }

    return <Outlet />
}
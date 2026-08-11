import { Route, Routes } from "react-router-dom"
import { AuthProvider } from "./context/AuthContext"
import LoginPage from "./pages/LoginPage"
import BlogListPage from "./pages/BlogListPage"
import ProtectedRoute from "./context/ProtectedRoute"
import RegisterPage from "./pages/RegisterPage"
import Layout from "./components/Layout"
import BlogDetailPage from "./pages/BlogDetailPage"
import BlogFormPage from "./pages/BlogFormPage"
import AdminUsersPage from "./pages/AdminPage"


function App() {


  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />


        <Route element={<ProtectedRoute />}>
          <Route element={<Layout />} >

            <Route path="blogs" element={<BlogListPage />} />
            <Route path="blogs/new" element={<BlogFormPage />} />
            <Route path="blogs/:id" element={<BlogDetailPage />} />
            <Route path="blogs/:id/edit" element={<BlogFormPage />} />


            <Route element={<ProtectedRoute role="SUPER_ADMIN" />}>
              <Route path="/admin" element={<AdminUsersPage />} />
            </Route>
          </Route>

        </Route>

      </Routes>
    </AuthProvider >
  )
}

export default App

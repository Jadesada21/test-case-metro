import { Route, Routes } from "react-router-dom"
import { AuthProvider } from "./context/AuthContext"
import LoginPage from "./pages/LoginPage"
import BlogListPage from "./pages/BlogListPage"
import ProtectedRoute from "./context/ProtectedRoute"
import RegisterPage from "./pages/RegisterPage"


function App() {


  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />


        <Route element={<ProtectedRoute />}>
          <Route path="blogs" element={<BlogListPage />} />

        </Route>
      </Routes>
    </AuthProvider >
  )
}

export default App

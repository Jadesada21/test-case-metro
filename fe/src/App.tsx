import { Route, Routes } from "react-router-dom"
import { AuthProvider } from "./context/AuthContext"
import LoginPage from "./pages/LoginPage"


function App() {


  return (
    <AuthProvider>
      <Routes>
        {/* <Route path="/" element={ }></> */}
        <Route path="/login" element={<LoginPage />} />
        {/* <Route path="/register" element={ }></> */}

      </Routes>
    </AuthProvider>
  )
}

export default App

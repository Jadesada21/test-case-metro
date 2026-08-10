import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import { ApiError } from "../lib/apiClient";
import { Eye } from "lucide-react";

type Errors = {
    email: string | null
    password: string | null
    general: string | null
}

export default function LoginPage() {
    const { login } = useAuth()
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [submitting, setSubmitting] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [error, setError] = useState<Errors>({
        email: null,
        password: null,
        general: null
    })

    async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
        e.preventDefault()
        setError({
            email: null,
            password: null,
            general: null
        })

        let hasError = false

        if (email.length === 0) {
            setError((prev) => ({
                ...prev,
                email: "Please enter your email"
            }))
            hasError = true
        }

        if (password.length === 0) {
            setError((prev) => ({
                ...prev,
                password: "Please enter your password"
            }))
            hasError = true
        }

        if (password.length < 8) {
            setError((prev) => ({
                ...prev,
                password: "Password must be at least 8 characters"
            }))
            hasError = true
        }

        if (hasError) {
            return
        }

        setSubmitting(true)
        try {
            await login(email, password)
            navigate('/blogs')
        } catch (err) {
            if (err instanceof ApiError) {
                setError((prev) => ({ ...prev, general: err.message }))
            } else {
                setError((prev) => ({
                    ...prev,
                    general: "Login failed try again"
                }))
            }
        } finally {
            setSubmitting(false)
        }
    }

    const toggleShowPassword = () => {
        if (showPassword === true) {
            setShowPassword(false)
        } else {
            setShowPassword(true)
        }
    }


    return (
        <div className="min-h-screen pt-40">

            <form
                onSubmit={handleSubmit}
                className="max-w-120 mx-auto p-6 border rounded-2xl shadow-2xl space-y-4 "
            >

                <h1 className="text-center text-2xl py-5">เข้าสู่ระบบ</h1>

                <input
                    id="email"
                    type="email"
                    value={email}
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoComplete="email"
                    className="w-full border rounded px-3 py-2"
                />
                {error.email && (
                    <p className="text-red-500">
                        {error.email}
                    </p>
                )}

                <div className="flex relative pt-3">
                    <input
                        id="password"
                        type={showPassword ? "text" : 'password'}
                        value={password}
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        autoComplete="current-password"
                        className="w-full border rounded px-3 py-2"
                    />

                    <button
                        className="absolute pt-3 right-3 top-1/2 -translate-y-1/2 cursor-pointer active:scale-95 transition-transform"
                        type="button"
                        onClick={toggleShowPassword}
                    >
                        <Eye size={18} />
                    </button>
                </div>

                {error.general && (
                    <p className="text-red-500">
                        {error.general}
                    </p>
                )}


                <div className="pt-3">
                    <button
                        type="submit"
                        disabled={submitting}
                        className="w-full bg-black text-white rounded py-2 active:scale-95 active:bg-black/70 disabled:opacity-50 cursor-pointer transition-transform"
                    >
                        {submitting ? 'Logging in...' : 'login'}
                    </button>
                </div>

            </form>

            <div className="text-center text-xl pt-10">
                ยังไม่มีบัญชี? <Link to="/register">สมัครสมาชิก</Link>
            </div>
        </div>
    )
}


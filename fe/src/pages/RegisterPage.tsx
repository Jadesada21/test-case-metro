import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import { ApiError } from "../lib/apiClient";
import { PasswordToggle } from "../components/ShowPassword";

type Errors = {
    username: string | null
    email: string | null
    password: string | null
    general: string | null
}

export default function RegisterPage() {
    const { register } = useAuth();
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<Errors>({
        username: null,
        email: null,
        password: null,
        general: null
    });
    const [submitting, setSubmitting] = useState(false);
    const [showPassword, setShowPassword] = useState(false)

    async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
        e.preventDefault()
        setError({
            username: null,
            email: null,
            password: null,
            general: null
        })
        setSubmitting(true)
        try {
            let hasError = false

            if (username.length < 4 || username.length > 20) {
                setError((prev) => ({
                    ...prev,
                    username: "Username should between 4-20 characters"
                }))
                hasError = true
            }

            if (email.length === 0) {
                setError((prev) => ({
                    ...prev,
                    email: "Please enter your email"
                }))
                hasError = true
            }

            if (!email.includes('@')) {
                setError((prev) => ({ ...prev, email: "กรุณากรอกอีเมลให้ถูกต้อง" }))
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
                    password: "Password must be at least 8 charactors"
                }))
                hasError = true
            }

            if (hasError) {
                return
            }

            await register(username, email, password)
            setTimeout(() => navigate('/'), 1800)
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
        setShowPassword(prev => !prev)
    }

    return (
        <div className="min-h-screen pt-40">

            <form
                onSubmit={handleSubmit}
                className="max-w-120 mx-auto p-6 border rounded-2xl shadow-2xl space-y-4 "
            >
                <h1 className="text-center text-2xl py-5">สมัครสมาชิก</h1>

                <input
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    placeholder="username"
                    minLength={4}
                    maxLength={20}
                    className="w-full border rounded px-3 py-3"
                />

                {error.username && (
                    <p className="text-red-500">
                        {error.username}
                    </p>
                )}

                <div className="pt-3">
                    <input
                        id="email"
                        type="email"
                        value={email}
                        placeholder="email"
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full border rounded px-3 py-3"
                    />

                    {error.email && (
                        <p className="text-red-500">
                            {error.email}
                        </p>
                    )}
                </div>


                <div className="flex relative pt-3">
                    <input
                        id="password"
                        type={showPassword ? "text" : 'password'}
                        value={password}
                        placeholder="password"
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        minLength={8}
                        className="w-full border rounded px-3 py-3"
                    />

                    <PasswordToggle
                        showPassword={showPassword}
                        onToggle={toggleShowPassword}
                    />
                </div>

                {error.password && (
                    <p className="text-red-500">
                        {error.password}
                    </p>
                )}

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
                        {submitting ? 'กำลังสมัคร...' : 'สมัครสมาชิก'}
                    </button>
                </div>
            </form>

            <div className="text-center text-xl pt-10">
                มีบัญชีอยู่แล้ว? <Link to="/">เข้าสู่ระบบ</Link>
            </div>
        </div>
    )
}
import { Eye, EyeOff } from 'lucide-react'

interface PasswordToggleProps {
    showPassword: boolean
    onToggle: () => void
}

export function PasswordToggle({
    showPassword,
    onToggle
}: PasswordToggleProps) {
    return (
        <button
            type="button"
            onClick={onToggle}
            className="absolute right-3 top-1/2 -translate-y-1/4"
        >
            {showPassword ? (
                <EyeOff size={20} />
            ) : (
                <Eye size={20} />
            )}
        </button>
    )
}
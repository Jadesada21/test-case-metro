

export interface FormActiveProps {
    onCancel: () => void
    isPending?: boolean
    disabled?: boolean
    submitText?: string
    cancelText?: string
    className?: string
    submitClassName?: string
    cancelClassName?: string
}
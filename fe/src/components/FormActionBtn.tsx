import type { FormActiveProps } from "../types/form-action-btn.type";


export default function FormActionBtn({
    onCancel,
    isPending,
    disabled,
    submitText = 'Submit',
    cancelText = 'Cancel',
    className,
    submitClassName,
    cancelClassName
}: FormActiveProps) {
    return (
        <div className={`flex justify-center px-3 mt-5 ${className}`}>
            <button
                type="submit"
                disabled={disabled || isPending}
                className={`rounded-xl bg-green-500 px-3 py-2 font-bold text-white w-40 active:scale-95 active:opacity-60 transition-transform
                disabled:opacity-50 disabled:cursor-not-allowed
                ${submitClassName}`}
            >
                {isPending ? "On proceed..." : submitText}
            </button>

            <button
                type="button"
                disabled={isPending}
                onClick={onCancel}
                className={`rounded-xl bg-red-500 px-3 py-2 font-bold text-white w-40 active:scale-95 active:opacity-60 transition-transform
                disabled:opacity-50 disabled:cursor-not-allowed
                ${cancelClassName}`}
            >
                {cancelText}
            </button>
        </div>
    )
}


export default function FormatDate(date?: string) {
    if (!date) return "-"
    return new Date(date).toLocaleDateString('en-GB')
}
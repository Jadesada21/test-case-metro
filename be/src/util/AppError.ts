export class AppError extends Error {
    statusCode: number
    constructor(message: string, statusCode = 500) {
        super(message)
        this.name = "AuthError"
        this.statusCode = statusCode
    }
}
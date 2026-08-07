import 'dotenv/config'
import buildApp from './src/app'

const app = buildApp()

const start = async () => {
    try {
        const port = Number(process.env.PORT) || 3000
        await app.listen({ port, host: '0.0.0.0' })
        app.log.info(`Server is running on ${port}`)
    } catch (err) {
        app.log.error(err)
        process.exit(1)
    }
}

start()
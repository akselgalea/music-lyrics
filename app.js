import express, { json } from 'express'
import { corsMiddleware } from './middlewares/cors.js'
import { musicRouter } from './routes/deezer.js'
import { lyricsRouter } from './routes/genius.js'

const app = express()

app.disable('x-powered-by')
app.use(json())
app.use(corsMiddleware())

app.use('/music', musicRouter)
app.use('/lyrics', lyricsRouter)

const PORT = process.env.PORT ?? 1234

app.listen(PORT, () => {
  console.log(`server listening on port http://localhost:${PORT}`)
})

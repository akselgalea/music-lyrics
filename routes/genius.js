import { Router } from 'express'
import { LyricController } from '../controllers/lyrics.js'

export const lyricsRouter = Router()

lyricsRouter.get('/', LyricController.getAll)

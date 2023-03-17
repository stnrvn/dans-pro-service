import express from 'express'

const router = express.Router()

import authRouter from './auth.js'
import jobRouter from './job.js'

import { authenticate } from '../middlewares/auth.js'

router.use(authRouter)
router.use(authenticate)
router.use(jobRouter)

export default router

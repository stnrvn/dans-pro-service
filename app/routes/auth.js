import express from 'express'

import AuthController from '../controllers/AuthController.js'

const router = express.Router()

router.post('/register', AuthController.Register)
router.post('/signIn', AuthController.SignIn)

export default router

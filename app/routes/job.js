import express from 'express'

import JobController from '../controllers/JobController.js'

const router = express.Router()

router.get('/job', JobController.Get)
router.get('/job/:id', JobController.GetById)

export default router

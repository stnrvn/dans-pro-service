import * as dotenv from 'dotenv'
dotenv.config()

import express from 'express'

const app = express()
import cors from 'cors'

import routes from './app/routes/index.js'

app.use(express.json())

app.use(cors())

app.use(express.urlencoded({
    extended:true
}))

app.use('/', routes)

app.use((req, res) => {
  res.status(404).json({message: 'not found'})
})

app.listen(process.env.SERVER_PORT, () => {
  console.log(`Server Started at ${process.env.SERVER_PORT}`)
})
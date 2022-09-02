import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'
import connectDB from './config/db.js'
import cors from 'cors'
import path from "path"

// Routes
import boatRoutes from './routes/boat.routes.js'
import InvManagerRoutes from "./routes/inv.manage.routes.js"

dotenv.config()

//connect database
connectDB()

const app = express()

app.use(cors())
app.use(express.json())

// Calling Routes
app.use("/invManager", InvManagerRoutes);
app.use('/api/boats', boatRoutes);


if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

//create port
const PORT = process.env.PORT || 9000

app.listen(
  PORT,
  console.log(
    `server running in ${process.env.NODE_ENV} port ${PORT}`
  )
)

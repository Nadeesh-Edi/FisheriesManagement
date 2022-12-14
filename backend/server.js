import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'
import connectDB from './config/db.js'
import cors from 'cors'
import path from "path"

// Routes
import boatRoutes from './routes/boat.routes.js'
import InvManagerRoutes from "./routes/inv.manage.routes.js"
import OrderRoutes from './routes/OrderRoutes.js'
import BillRoutes from './routes/BillRoutes.js'
import ProductRoutes from './routes/ProductRoutes.js'

dotenv.config()

//connect database
connectDB()

const app = express()

app.use(cors())
app.use(express.json())

// Calling Routes
app.use("/api/invManager", InvManagerRoutes);
app.use('/api/boats', boatRoutes);
app.use('/order',OrderRoutes);
app.use('/bill',BillRoutes);
app.use('/product',ProductRoutes);


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

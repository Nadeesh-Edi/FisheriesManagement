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

import noteRoutes from './routes/noteRoutes.js';
import userRoutes from './routes/userRoutes.js';
import { errorHandler, notFound } from './middleware/errorMiddleware.js';

dotenv.config();

connectDB();

const app = express(); // main thing

app.use(cors())
app.use(express.json()); // to accept json data

app.use("/api/invManager", InvManagerRoutes);
app.use('/api/boats', boatRoutes);
app.use('/order',OrderRoutes);
app.use('/bill',BillRoutes);
app.use('/product',ProductRoutes);
app.use('/api/notes', noteRoutes);
app.use('/api/users', userRoutes);

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

// --------------------------deployment------------------------------
// const __dirname = path.resolve();

// if (process.env.NODE_ENV === 'production') {
//   app.use(express.static(path.join(__dirname, '/frontend/build')));

//   app.get('*', (req, res) =>
//     res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
//   );
// } else {
//   app.get('/', (req, res) => {
//     res.send('API is running..');
//   });
// }
// // --------------------------deployment------------------------------

// // Error Handling middlewares
// app.use(notFound);
// app.use(errorHandler);

// const PORT = process.env.PORT || 5000;

// app.listen(
//   PORT,
//   console.log(`Server running in dev mode on port ${PORT}..`.yellow)
// );

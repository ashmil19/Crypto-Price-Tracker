import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser'

import authRoutes from './routes/authRoutes.js'
import connectMongo from './config/mongo.js';
import { corsOptions } from './config/corsOptions.js';

dotenv.config();
const app = express();

app.use(cookieParser())
app.use(cors(corsOptions));
connectMongo();

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use("/", authRoutes)

app.listen(process.env.PORT, () => {
    console.log(`http://localhost:${process.env.PORT}`)
})
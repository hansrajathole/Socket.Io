import express, { urlencoded } from "express"
import roomRouter from '../src/routes/room.routes.js'
import cors from 'cors'

const app = express()


app.use(cors({
    origin : "*"
}))
app.use(express.json())
app.use(express.urlencoded({extended : true}))


app.use("/api/rooms",roomRouter)

export default app
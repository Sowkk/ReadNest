import express, { request } from "express"
import { PORT, mongoDBURL } from './config.js'
import mongoose from "mongoose"
import bookRouter from "./routes/bookRoute.js"
import { Book } from "./models/bookModel.js"
import cors from 'cors'
const app = express()
app.get('/', (request, response) => {
    console.log(request)
    return response.status(234).send('Welcome to ReadNest')
})

//middleware for parsing request body
app.use(express.json())


//middleware for CORS policy
app.use(cors())
// app.use(cors({
//     origin: "http://localhost:5555",
//     methods:['GET','POST','DELETE','PUT'],
//     allowedHeaders:'[content-type]'
// }))

app.use('/books',bookRouter)

//connecting to database 
mongoose
    .connect(mongoDBURL)
    .then(() => {
        console.log('Connected to database')
        app.listen(PORT, () => {
            console.log(`App is listening to ${PORT}`)
        })
    })
    .catch(error => {
        console.log(error)
    })


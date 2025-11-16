import express from "express";
import dotenv from "dotenv"
import cors from "cors";
import db from "./utils/db-connect.js";
import cookieParser  from "cookie-parser";


//import all routes
import userRoutes from "./routes/user.routes.js"


dotenv.config();

const app = express()


app.use(cors(
    {
        origin: process.env.BASE_URL,
        credentials : true,
        methods : ['GET' , 'POST' , 'PUT' , 'DELETE'],
        allowedHeaders : ['Content-Type' , 'Authorization']
    }
)) 

app.use(express.json()) //express.json() is a middleware function
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

const port = process.env.PORT || 3000

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

// app.get('/tarun' , (req,res) => {
//     res.send("Hello Tarun!")
// })



//connect to db
db();


//user routes

app.use("/api/v1/users" , userRoutes)


console.log("PORT value:", process.env.PORT);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

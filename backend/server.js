import express from "express"
import cors from "cors"
import 'dotenv/config'
import connectDb from "./config/mongodb.js"
import connectCloudinary from "./config/cloudinary.js"
import adminRouter from "./routes/adminRout.js"
import doctorRouter from "./routes/doctorRout.js"
import userRouter from "./routes/userRout.js"

// app config
const app = express()
const port = process.env.PORT || 3000
connectDb()
connectCloudinary()

// Middleware
app.use(express.json())
app.use(cors())

// End Point 
app.use('/api/admin', adminRouter)
app.use('/api/doctor', doctorRouter)
app.use('/api/user', userRouter)

app.get('/', (req, res) => {
    res.send("Api is working")
})

app.listen(port, () => {
    console.log("Server listing on Port ", port)
})
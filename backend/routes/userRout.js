import express from "express"
import { appointmentList, bookAppointment, cancelAppointment, getProfile, loginUser, registerUser, updateProfile } from "../controllers/userController.js"
import authUser from "../middleware/authUser.js"
import upload from "../middleware/multer.js"

const userRouter = express.Router()

userRouter.post('/register', registerUser)
userRouter.post('/login', loginUser)
userRouter.get('/get-profile', authUser, getProfile)
userRouter.post('/update-profile', upload.single('image'), authUser, updateProfile)
userRouter.post('/book-appointment', authUser, bookAppointment)
userRouter.get('/appointment-list', authUser, appointmentList)
userRouter.post('/cancel-appointment', authUser, cancelAppointment)


export default userRouter
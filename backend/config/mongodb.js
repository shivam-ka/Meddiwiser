import mongoose from "mongoose"


const connectDb = async ()=> {
    try {
        mongoose.connection.on('connected',() => console.log('Database Connected Successfully !!'))
        await mongoose.connect(`${process.env.MONGODB_URI}/meddiwiser`)
    } catch (error) {
        console.log("connectDb Error: ",error)
    }
}

export default connectDb
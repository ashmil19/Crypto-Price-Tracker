import mongoose from "mongoose"

mongoose.set('strictQuery', false)

const connectMongo = () => {
    mongoose
        .connect(process.env.DATABASE_URL)
        .then(() => {
            console.log("connected to mongodb");
        })
        .catch((e) => {
            console.log(e.message)
        })
}

export default connectMongo
import mongoose from "mongoose";
const schema = mongoose.Schema;

const userSchema = new schema(
    {
        fullname: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        isVerify: {
            type: Boolean,
            default: false,
        },
        accessToken: {
            type: String,
            default: ""
        }
    },
    { timestamps: true }
)

export default mongoose.model('user', userSchema)



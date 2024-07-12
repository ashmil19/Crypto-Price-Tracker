import mongoose from "mongoose";
const schema = mongoose.Schema;

const searchSchema = new schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
            required: true
        },
        content: {
            type: String,
            required: true
        },

    },
    { timestamps: true }
)

export default mongoose.model("search", searchSchema)
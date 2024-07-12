import mongoose from "mongoose";
const schema = mongoose.Schema;

const priceHistoryModel = schema(
    {
        priceData: [
            {
                name: String,
                price: Number
            }
        ],
        CreatedAt: {
            type: Date,
            default: Date.now
        }
    }
)

priceHistoryModel.index({CreatedAt: 1}, {expexpireAfterSeconds: 1800})

export default mongoose.model("priceHistory", priceHistoryModel)
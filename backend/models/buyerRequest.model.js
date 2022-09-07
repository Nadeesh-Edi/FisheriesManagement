import  mongoose  from 'mongoose';

const buyRequestSchema = mongoose.Schema(
    {
        requester: {
            type: String,
            required: true
        },
        fishType: {
            type: String,
            required: true
        },
        qty: {
            type: Number,
            required: true
        }
    },
    {
        timestamps: true,
    }
)

const BuyerRequests = mongoose.model("BuyerRequests", buyRequestSchema);

export default BuyerRequests;
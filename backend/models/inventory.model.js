import  mongoose  from 'mongoose';

const inventorySchema = mongoose.Schema(
    {
        boatId : {
            type: String,
            required: true
        },
        owner : {
            type: String,
            required: true
        },
        inventoryDate : {
            type: String,
            required: true
        },
        fishType : {
            type: String,
            required: true
        },
        qty : {
            type: Number,
            required: true
        },
        assign : {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true,
    }
)

const Inventories = mongoose.model("Inventories", inventorySchema);

export default Inventories;
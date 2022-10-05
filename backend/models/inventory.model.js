import  mongoose  from 'mongoose';

const inventorySchema = mongoose.Schema(
    {
        boatName : {
            type: String,
            required: true
        },
        owner : {
            type: String,
            required: true
        },
        inventoryDate : {
            type: Date,
            required: true
        },
        fishType : {
            type: String,
            required: true
        },
        qty : {
            type: String,
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
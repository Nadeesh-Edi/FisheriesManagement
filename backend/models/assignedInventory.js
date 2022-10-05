import  mongoose  from 'mongoose';
import Order from '../models/OrderModel.js';
import Inventories from './inventory.model.js';

const assignedInventorySchema = mongoose.Schema(
    {
        inventory: {
            type: [Inventories.schema]
        },
        order: {
            type: Order.schema,
            required: true
        }
    },
    {
        timestamps: true,
    }
)

const AssignedInventories = mongoose.model("AssignedInv", assignedInventorySchema);

export default AssignedInventories;
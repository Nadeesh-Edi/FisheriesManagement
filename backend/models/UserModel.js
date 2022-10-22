import  mongoose  from 'mongoose';

const userSchema = mongoose.Schema(
    {
        username: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        type: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true,
    }
)

const Users = mongoose.model("Users", userSchema);

export default Users;
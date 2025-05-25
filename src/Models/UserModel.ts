import mongoose, {Schema} from "mongoose";

interface User{
    username: string,
    email: string,
    password: string,
    isSpecial: boolean,

}

const UserModel: Schema<User> = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    isSpecial: {
        type: Boolean,
        required: true
    },
})


const UserSchema = (mongoose.models.User as mongoose.Model<User>) || (mongoose.model<User>("User", UserModel))

export default UserSchema;
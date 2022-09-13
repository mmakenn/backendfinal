import mongoose from "mongoose";
import { ContainerMongo } from "../base/containerMongo.js"

const usersSchema = new mongoose.Schema(
    {
        id: { type: String, required: true },
        email: { type: String, required: true }, 
        password: { type: Object, required: true },
        name: { type: String, required: true },
        lastname: { type: String, required: true },
        phone: { type: String, required: true },
        image: { type: String }
    }
);

export class UsersContainer extends ContainerMongo {
    constructor(){
        super("users", usersSchema)
    }

    async getByEmail(email) {
        const user = await this.collection.findOne({ email: email })
        return user
    }
}
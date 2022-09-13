import mongoose from "mongoose"
import { ContainerMongo } from "../base/containerMongo.js"

const chatSchema = new mongoose.Schema({
    email: { type: String, required: true },
    date: { type: Date, required: true },
    text: { type: String, required: true }
});

export class ChatContainer extends ContainerMongo {
    constructor(){
        super('chat', chatSchema)
    }
}
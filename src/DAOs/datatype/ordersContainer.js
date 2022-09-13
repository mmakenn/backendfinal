import mongoose from "mongoose"
import { ContainerMongo } from "../base/containerMongo.js"

const orderSchema = new mongoose.Schema({
    id: { type: String, required: true },
    customerId: { type: String, required: true },
    date: { type: Date, required: true },
    productsList: { type: Array, required: true }
});

export class OrdersContainer extends ContainerMongo {
    constructor(){
        super('order', orderSchema)
    }

    async getByCustomerId(customerId) {
        const orders = await this.collection.find({ customerId: customerId })
        return orders
    }
}
import mongoose from "mongoose";
import { ContainerMongo } from "../base/containerMongo.js";

const cartSchema = new mongoose.Schema({
    id: { type: String, required: true },
    products: { type: Array, required: true }
});

export class CartsContainer extends ContainerMongo {
    constructor(){
        super('cart', cartSchema);
    }
    
    async update({ id, productsList }) {
        const info = await this.collection.updateOne(
            { id: id },
            { $set: { products: productsList } }
        );
        if (info.modifiedCount == 0) {
            return false;
        }
        return true;
    }
}
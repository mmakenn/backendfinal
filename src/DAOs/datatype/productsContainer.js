import mongoose from "mongoose";
import { ContainerMongo } from "../base/containerMongo.js"

const productsListSchema = new mongoose.Schema({
    id: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    image: { type: String }
});

export class ProductsContainer extends ContainerMongo {
    constructor(){
        super('products', productsListSchema);
    }

    async update({ id, name, description, price, image }){
        const info = await this.collection.updateOne(
            { id: id },
            [{ $set: { name: name,
                    description: description,
                    price: price,
                    image: image } 
            }]
        )
        if (info.modifiedCount == 0) {
            return false;
        }
        return true;
    }
}
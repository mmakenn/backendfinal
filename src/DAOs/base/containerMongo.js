import mongoose from "mongoose";
import { mongoDB, codeForDevelDeploy } from "../../../config.js";
import logger from '../../misc/logger.js'

export class ContainerMongo {
    constructor(collecName, schema) {
        this.collection = mongoose.model(collecName, schema);
    }

    async init(mode) {
        let urlServer = mongoDB.urlServerLocal
        if (mode != codeForDevelDeploy) {
            urlServer = mongoDB.urlServerAtlas
        }
        try {
            await mongoose.connect(urlServer, mongoDB.options)
            return true
        } catch (err) {
            logger.error(`Error with connection
                        Database error:
                        \t ${err}`)
            return false
        }
    }

    async getAll() {
        const all = await this.collection.find({});
        return all
    }

    async save(object) {
        const info = await this.collection.create(object);
    }

    async getById(id) {
        const objects = await this.collection.find({id: id});
        if (objects.length == 0) {
            logger.error(`Error, object with id ${id} not found`)
            return null;
        }
        return objects[0];
    }

    async deleteById(id) {
        const info = await this.collection.deleteOne({id: id});
        if (info.deletedCount == 0){
            logger.error(`Error, object with id ${id} not found, can't be deleted.`)
            return false;
        }
        return true;
    }

    async close() {
        await mongoose.disconnect();
    }
}
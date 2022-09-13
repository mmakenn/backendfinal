import session from 'express-session';
import MongoStore from 'connect-mongo';
import { mongoDB, codeForDevelDeploy, deployMode, secretWord } from '../../config.js';

let urlServer = mongoDB.urlServerLocal
if (deployMode != codeForDevelDeploy) {
    urlServer = mongoDB.urlServerAtlas
}

export const sessionHandler = session({
        store: MongoStore.create({
            mongoUrl: urlServer,
            mongoOptions: mongoDB.advancedOptions
        }),
        secret: secretWord,
        resave: true,
        rolling: true,
        saveUninitialized: false,
    })
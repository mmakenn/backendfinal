import 'dotenv/config'
import parseArgs from 'minimist'

/* ---------------------------------------------------------------------------------------------- */
/*                                         Server Options                                         */
/* ---------------------------------------------------------------------------------------------- */
export const PORT = process.env.PORT || 8080
export const SERVER_MODE = parseArgs(process.argv).server_mode ? parseArgs(process.argv).server_mode : 'fork'
export const deployMode = parseArgs(process.argv).deploy_mode ? parseArgs(process.argv).deploy_mode : 'prod'
export const codeForDevelDeploy = 'devel'
export const handlebarsConfig = {
    extname: '.hbs',
    defaultLayout: 'index.hbs'
}

/* ---------------------------------------------------------------------------------------------- */
/*                                       Databases Options                                        */
/* ---------------------------------------------------------------------------------------------- */
export const secretWord = process.env.SECRET_WORD

export const mongoDB = {
    urlServerAtlas: `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.6zovj.mongodb.net/${process.env.MONGO_DATABASE}?retryWrites=true&w=majority`,
    urlServerLocal: `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@127.0.0.1:${process.env.MONGO_LOCAL_PORT}/${process.env.MONGO_DATABASE}?authSource=admin&w=1`,
    options: {
        serverSelectionTimeoutMS: 5000,
    },
    advancedOptions: { 
        useNewUrlParser: true, 
        useUnifiedTopology: true 
    }
}

/* ---------------------------------------------------------------------------------------------- */
/*                                      Users and permissons                                      */
/* ---------------------------------------------------------------------------------------------- */

export const serverEmail = process.env.SERVER_EMAIL
export const serverEmailPassword = process.env.SERVER_TOKEN
export const adminEmail = process.env.ADMIN_EMAIL
import dotenv from 'dotenv'

dotenv.config();

export default {
        ENVIROMENT:process.env.ENVIROMENT,
        port: process.env.PORT,
        mongoUrl: process.env.MONGO_URL,
        sessionSecret: process.env.SESSION_SECRET,
        COOKIE_PARSER: process.env.COOKIE_PARSER,
        CLIENT_ID: process.env.CLIENT_ID,
        CLIENT_SECRET: process.env.CLIENT_SECRET
}
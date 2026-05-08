import "dotenv/config"

if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI is not defined")
}

if (!process.env.PORT) {
    throw new Error("PORT is not defined")
}

if (!process.env.GEMINI_API_KEY) {
    throw new Error("PORT is not defined")
}

export const config = {
    PORT: process.env.PORT,
    MONGO_URI: process.env.MONGO_URI,
    GEMINI_API_KEY: process.env.GEMINI_API_KEY
}
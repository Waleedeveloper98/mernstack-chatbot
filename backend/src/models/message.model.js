import mongoose from "mongoose"

const messageSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ["user", "ai"],
        required: true
    }
}, { timestamps: true })


const messageModel = mongoose.model("Message", messageSchema)

export default messageModel
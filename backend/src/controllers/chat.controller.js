import messageModel from "../models/message.model.js";
import { generateResponse } from "../services/ai.service.js";

export const chatController = async (req, res) => {

    try {

        const { message } = req.body;

        if (!message) {
            return res.status(400).json({
                message: "Message is required"
            });
        }

        // save user message
        const userMessage = await messageModel.create({
            content: message,
            role: "user"
        });

        // get previous chat history
        const previousMessages = await messageModel.find()
            .sort({ createdAt: 1 });

        // generate AI response with memory
        const aiResponse = await generateResponse(previousMessages);

        // save ai response
        const aiMessage = await messageModel.create({
            content: aiResponse,
            role: "ai"
        });

        return res.status(200).json({
            success: true,
            userMessage,
            aiMessage
        });

    } catch (error) {

        return res.status(500).json({
            message: "Internal server error",
            error: error.message
        });

    }

};
// chat.controller.js

import messageModel from "../models/message.model.js";

import {
    generateResponse,
} from "../services/ai.service.js";

export const chatController = async (
    req,
    res
) => {

    try {

        const { message } = req.body;

        if (!message) {

            return res.status(400).json({
                message: "Message is required",
            });

        }

        // SAVE USER MESSAGE

        const userMessage =
            await messageModel.create({
                content: message,
                role: "user",
            });

        // GET CHAT HISTORY

        const previousMessages =
            await messageModel.find().sort({
                createdAt: 1,
            });

        // GENERATE AI RESPONSE

        const aiResponse =
            await generateResponse(
                previousMessages
            );

        console.log(
            "RAW AI RESPONSE:",
            aiResponse
        );

        let parsedResponse;

        try {

            const cleanedResponse =
                aiResponse
                    .replace(/```json/g, "")
                    .replace(/```/g, "")
                    .trim();

            parsedResponse =
                JSON.parse(cleanedResponse);

        } catch (error) {

            console.log(
                "JSON PARSE ERROR:",
                error.message
            );

            parsedResponse = {
                reply:
                    "Maazrat 😔 System issue aa gaya.",
                intent: "error",
                orderComplete: false,
                customerName: "",
                phone: "",
                address: "",
                paymentMethod: "",
                items: [],
                totalPrice: 0,
            };

        }

        // SAVE FULL AI DATA

        const aiMessage =
            await messageModel.create({
                content: JSON.stringify(
                    parsedResponse
                ),
                role: "ai",
            });

        // RETURN RESPONSE

        return res.status(200).json({
            success: true,
            userMessage,
            aiMessage,
            aiData: parsedResponse,
        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            message:
                "Internal server error",
            error: error.message,
        });

    }

};
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { config } from "../config/config.js";
import {
    HumanMessage,
    SystemMessage,
    AIMessage
} from "@langchain/core/messages";

const geminiModel = new ChatGoogleGenerativeAI({
    model: "gemini-2.5-flash-lite",
    apiKey: config.GEMINI_API_KEY
});

export const generateResponse = async (messages) => {

    const chatHistory = [
        new SystemMessage(
            "You are a helpful assistant who answers user questions accurately and remembers previous conversation context."
        )
    ];

    messages.forEach((msg) => {

        if (msg.role === "user") {
            chatHistory.push(
                new HumanMessage(msg.content)
            );
        }

        if (msg.role === "ai") {
            chatHistory.push(
                new AIMessage(msg.content)
            );
        }

    });

    const result = await geminiModel.invoke(chatHistory);

    return result.text;
};
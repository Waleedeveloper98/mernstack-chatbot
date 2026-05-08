import axios from "axios";

const chatApi = axios.create({
    baseURL: "http://localhost:3000",
});

export const handleChat = async ({ message }) => {

    const response = await chatApi.post(
        "/api/chat",
        {
            message,
        }
    );
    console.log(response.data)

    return response.data;
};
import apiClient from "../api-client";

export const createChatRoom = (chatRoomData) => {
    return apiClient.post("/chatbot/rooms", chatRoomData);
}

export const getChatRooms = () => {
    return apiClient.get("/chatbot/rooms");
}

export const getChatDialogs = (roomId) => {
    return apiClient.get(`/chatbot/rooms/${roomId}/messages`);
}

export const postMessage = (roomId, chatData) => {
    return apiClient.post(`/chatbot/rooms/${roomId}/messages`, chatData);
}
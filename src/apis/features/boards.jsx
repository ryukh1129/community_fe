import httpClient from "..";

export const createBoard = (title) => {
    return httpClient.post("/boards", { title });
}

export const getBoards = () => {
    return httpClient.get("/boards");
}
import baseService from "./base.service";

const securedInstance = baseService.service(true);

export const getById = (boardId) => {
    return securedInstance.get(`/boards/${boardId}`)
                        .then((response) => response.data);
};

export const getLists = (boardId) => {
    return securedInstance.get(`/boards/${boardId}/lists`)
                        .then((response) => response.data);
};

export const insertBoard = (board) => {
    return securedInstance.post(`/boards`, board)
                        .then((response) => response.data);
};

export const updateBoard = (board) => {
    return securedInstance.put(`/boards/${board.id}`, board)
                        .then((response) => response.data);
};

export const deleteBoard = (boardId) => {
    return securedInstance.delete(`/boards/${boardId}`)
                        .then((response) => response.data);
};

export default {
    getById,
    getLists,
    insertBoard,
    updateBoard,
    deleteBoard
};
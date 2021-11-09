import baseService from "./base.service";

const securedInstance = baseService.service(true);

export const getAllCards = (listId) => {
    return securedInstance.get(`/lists/${listId}/cards`);
}

export const insertList = (list) => {
    return securedInstance.post(`/lists`, list);
};

export const updateList = (list) => {
    return securedInstance.put(`/lists/${list.id}`, list);
};

export const deleteList = (listId) => {
    return securedInstance.delete(`/lists/${listId}`)
                        .then((response) => response.data);
};

export default {
    insertList,
    updateList,
    deleteList,
    getAllCards
};
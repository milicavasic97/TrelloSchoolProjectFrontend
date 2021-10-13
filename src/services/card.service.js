import baseService from "./base.service";

const securedInstance = baseService.service(true);

export const getCard = (cardId) => {
  return securedInstance.get(`/cards/${cardId}`);
};

export const insertCard = (card) => {
  return securedInstance.post(`/cards`, card);
};

export const updateCard = (card) => {
  return securedInstance
    .put(`/cards/${card.id}`, card)
    .then((response) => response.data);
};

export const deleteCard = (cardId) => {
  return securedInstance.delete(`/cards/${cardId}`);
};

export default {
  insertCard,
  updateCard,
  deleteCard,
  getCard,
};

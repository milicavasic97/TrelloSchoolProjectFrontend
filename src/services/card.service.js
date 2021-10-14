import baseService from "./base.service";

const securedInstance = baseService.service(true);

export const getCard = (cardId) => {
  return securedInstance.get(`/cards/${cardId}`);
};

export const insertCard = (card) => {
  return securedInstance.post(`/cards`, card);
};

export const updateCard = (card) => {
  return securedInstance.put(`/cards/${card.id}`, card);
};

export const deleteCard = (cardId) => {
  return securedInstance.delete(`/cards/${cardId}`);
};

export const getMembers = (cardId) => {
  return securedInstance.get(`/cards/${cardId}/members`);
};

export const getComments = (cardId) => {
  return securedInstance.get(`/cards/${cardId}/comments`);
};

export const addComment = (comment) => {
  return securedInstance.post(
    `/cards/${comment.idCard}/actions/comments`,
    comment
  );
};

export const removeComment = (cardId, commentId) => {
  return securedInstance.delete(
    `/cards/${cardId}/actions/${commentId}/comments`
  );
};

export const addMember = (cardId, email) => {
  return securedInstance.post(`/cards/${cardId}/idMembers?email=${email}`);
};

export const removeMember = (cardId, memberId) => {
  return securedInstance.delete(`/cards/${cardId}/idMembers/${memberId}`);
};

export default {
  insertCard,
  updateCard,
  deleteCard,
  getCard,
  getMembers,
  addMember,
  removeMember,
  addComment,
  getComments,
  removeComment,
};

import baseService from "./base.service";

const securedInstance = baseService.service(true);

export const getAllOrganisationsForMe = (memberId) => {
  return securedInstance
    .get(`/members/${memberId}/organisations`)
    .then((response) => response.data);
};

export const getById = (organisationId) => {
  return securedInstance
    .get(`/organisations/${organisationId}`)
    .then((response) => response.data);
};

export const getBoardsForOrganisation = (organisationId) => {
  return securedInstance
    .get(`/organisations/${organisationId}/boards`)
    .then((response) => response.data);
};

export const getMembersForOrganisation = (organisationId) => {
  return securedInstance
    .get(`/organisations/${organisationId}/members`)
    .then((response) => response.data);
};

export const insertOrganisation = (organisation) => {
  return securedInstance
    .post(`/organisations`, organisation)
    .then((response) => response.data);
};

export const updateOrganisation = (organisation) => {
  return securedInstance
    .put(`/organisations/${organisation.id}`, organisation)
    .then((response) => response.data);
};

export const deleteOrganisation = (organisationId) => {
  return securedInstance
    .delete(`/organisations/${organisationId}`)
    .then((response) => response.data);
};

export const invite = (idOrganisation, invitation) => {
  return securedInstance
    .put(`/organisations/${idOrganisation}/members`, invitation)
    .then((response) => response.data);
};

export default {
  getAllOrganisationsForMe,
  getById,
  getBoardsForOrganisation,
  getMembersForOrganisation,
  insertOrganisation,
  updateOrganisation,
  deleteOrganisation,
  invite,
};

import baseService from "./base.service";

const instance = baseService.service();
const securedInstance = baseService.service(true);

export const login = (username, password) =>
  instance.post("/login", { username, password }).then((resposne) => {
    const member = resposne.data;
    sessionStorage.setItem("auth", member.token);
    return { ...member, token: null };
  });

export const signUp = (member) => instance.post("/sign-up", member);

export const state = () => {
  return securedInstance.get("/state").then((responese) => responese.data);
};

export const logout = () => sessionStorage.removeItem("auth");

export const update = (member) =>
  securedInstance
    .put(`/members/${member.id}`, member)
    .then((response) => response.data);

export const getAll = () =>
  securedInstance.get(`/members`).then((response) => response.data);

export const getInvitations = (idMember) =>
  securedInstance
    .get(`/members/${idMember}/organizationsInvited`)
    .then((response) => response.data);

export const acceptInvitation = (idInvitation) =>
  securedInstance
    .put(`/members/invitations/${idInvitation}/accept`)
    .then((response) => response.data);

export const rejectInvitation = (idInvitation) =>
  securedInstance
    .put(`/members/invitations/${idInvitation}/reject`)
    .then((response) => response.data);

export default {
  login,
  signUp,
  state,
  logout,
  update,
  getAll,
  getInvitations,
  acceptInvitation,
  rejectInvitation,
};

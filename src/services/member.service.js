import baseService from "./base.service";


const instance = baseService.service();
const securedInstance = baseService.service(true);

export const login = (username, password) => 
    instance.post("/login", {username, password}).then((resposne) => {
        const member = resposne.data;
        sessionStorage.setItem("auth", member.token);
        return { ...member, token: null};
    }); 

export const signUp = (member) => instance.post("/sign-up", member);

export const state = () => {
    return securedInstance.get("/state").then((responese) => responese.data)
};

export const logout = () => sessionStorage.removeItem("auth");

export default {
    login,
    signUp,
    state,
    logout
};
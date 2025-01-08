import api from "./api";

export const requestLogin = async (userId, password) => {
    const userData = { userId, password }
    const response = await api.post("/users/login", userData);

    return response.data;
};

export const requestRegister = async (nickname, email, userId, password) => {
    const userData = { nickname, email, userId, password }
    const response = await api.post("/users/register", userData);

    return response.data;
}
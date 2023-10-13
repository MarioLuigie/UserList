import axios from "axios";

const url = "https://places-arw.vercel.app/api/people";

const peopleAxios = axios.create({baseURL: url});

//Crate user fetch
export const createUser = async (newUser) => {
  const data = await peopleAxios.post("/", newUser);
  return data;
}

//Read users fetch
export const readUsers = async () => {
  const data = await peopleAxios.get("/");
  return data;
}

//Update selected user fetch
export const updateUser = async (formData, id) => {
  const data = await peopleAxios.patch(`/${id}`, formData);
  return data;
}

//Delete selected user fetch
export const deleteUser = async (id) => {
  const data = await peopleAxios.delete(`/${id}`);
  return data;
}

//Delete all users fetch
export const deleteAll = async () => {
  const data = await peopleAxios.delete("/");
  return data;
}


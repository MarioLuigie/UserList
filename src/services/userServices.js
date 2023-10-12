import axios from "axios";

const url = "https://places-arw.vercel.app/api/people";
const urlSelectedId = selectedId => `${url}/${selectedId}`;
const urlEditingId = editingId => `${url}/${editingId}`;

//Crate user fetch
export const createUser = async (newUser) => {
  const data = await axios.post(url, newUser);
  return data;
}

//Read users fetch
export const readUsers = async () => {
  const data = await axios.get(url);
  return data;
}

//Update selected user fetch
export const updateUser = async (formData, editingUser) => {
  const data = await axios.patch(urlEditingId(editingUser._id), formData);
  return data;
}

//Delete selected user fetch
export const deleteUser = async (id) => {
  const data = await axios.delete(urlSelectedId(id));
  return data;
}

//Delete all users fetch
export const deleteAll = async () => {
  const data = await axios.delete(url);
  return data;
}


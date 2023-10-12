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
  const res = await fetch(url);
  return res;
}

//Update selected user fetch
export const updateUser = async (formData, editingUser) => {
  const res = await fetch(urlEditingId(editingUser._id), {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData)
  });
  return res;
}

//Delete selected user fetch
export const deleteUser = async (id) => {
  const res = await fetch(urlSelectedId(id), {method: "DELETE"});
  return res;
}

//Delete all users fetch
export const deleteAll = async () => {
  const res = await fetch(url, {method: "DELETE"});
  return res;
}


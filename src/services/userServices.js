const url = "https://places-arw.vercel.app/api/people";
const urlSelectedId = selectedId => `${url}/${selectedId}`;
const urlEditingId = editingId => `${url}/${editingId}`;

export const createUser = async (newUser) => {
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newUser)
  });
  return res;
}

export const readUsers = async () => {
  const res = await fetch(url);
  return res;
}

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

export const deleteUser = async (id) => {
  const res = await fetch(urlSelectedId(id), {method: "DELETE"});
  return res;
}

export const deleteAll = async () => {
  const res = await fetch(url, {method: "DELETE"});
  return res;
}
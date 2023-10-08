// /** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useEffect } from "react";

import { useUserContext } from '../../Context/UserContext';
import Button from "../UI/Button";
import Input from "../UI/Input";
import { useState } from 'react';
import { userActions } from "../../constans/actions";

const styles = css`
  width: 100%;
  padding: 30px 0 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
  border-bottom: #afafaf solid 1px;

  .buttons {
    display: flex;
    padding-top: 30px;
    gap: 20px;
    justify-content: center;
    align-items: center;
    width: 100%;
  }

`

export default function UserInput() {
  const initFormData = {
    name: "",
    surname: "",
    age: ""
  }

  const { userListDispatch, editingUser, setEditingUser } = useUserContext();
  const [formData, setFormData] = useState(initFormData);
  const { CREATE, UPDATE } = userActions;

  const url = "https://places-arw.vercel.app/api/people";

  const handleCancel= () => {
    setFormData(initFormData);
    setEditingUser(false);
  }

  const handleChangeForm = (evt) => {
    setFormData({
      ...formData,
      [evt.target.name]: evt.target.value
    });
  }

  const handleCreateUser = async () => {
    const { name, surname, age } = formData;
    const newUser = { name, surname, age };

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser)
      });

      if(!res.ok) {
        throw new Error("Failed to add user.");
      }

      const user = await res.json();

      userListDispatch({ type: CREATE, user });

      setFormData(initFormData);

      console.log("User added successfully.", res, user);

    } catch (error) {
      console.error("Error while adding user:", error);
    }
  }

  useEffect(() => {
    if(editingUser) {
      const { name, surname, age, _id } = editingUser;
      setFormData({ name, surname, age, _id });
    }
  }, [editingUser]);

  const handleUpdateSelected = async () => {
    try {
      if(!editingUser) {
        console.error("No selected user ID to update.");
        return;
      }

      const urlId = `https://places-arw.vercel.app/api/people/${editingUser._id}`;

      const res = await fetch(urlId, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData)
      });

      if(!res.ok) {
        throw new Error("Failed to update user.");
      }

      const user = await res.json();

      // console.log(data);
      userListDispatch({type: UPDATE, user});
      setFormData(initFormData);
      setEditingUser(null);//Turn off update mode
      
    } catch (error) {
      console.error("Error while updating selected user.")
    }
  }

  return (
    <div css={styles}>
      <Input 
        id="userName" 
        label="Name" 
        name="name"
        type="text" 
        placeholder="Insert name"
        onChange={handleChangeForm}
        value={formData.name}
      /> 
      <Input 
        id="userSurname" 
        label="Surname"
        name="surname" 
        type="text" 
        placeholder="Insert surname" 
        onChange={handleChangeForm}
        value={formData.surname}
      /> 
      <Input 
        id="userAge" 
        label="Age" 
        name="age"
        type="number" 
        placeholder="Insert age" 
        onChange={handleChangeForm}
        value={formData.age}
      /> 
      {!editingUser && <div className='buttons'>
        <Button label="cancel" onHandle={handleCancel}/> 
        <Button label="Add" onHandle={handleCreateUser} />
      </div>}
      {editingUser && <div className='buttons'>
        <Button label="cancel" onHandle={handleCancel}/> 
        <Button label="Update" onHandle={handleUpdateSelected} />
      </div>}
    </div>
  )
}
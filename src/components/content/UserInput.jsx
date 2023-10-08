// /** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

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
  const url = "https://places-arw.vercel.app/api/people";

  const initFormData = {
    name: "",
    surname: "",
    age: ""
  }

  const { userListDispatch } = useUserContext();
  const [formData, setFormData] = useState(initFormData);
  const { ADD } = userActions;

  const handleCancel= () => {
    setFormData(initFormData);
  }

  const handleChangeInput = (evt) => {
    setFormData({
      ...formData,
      [evt.target.name]: evt.target.value
    });
  }

  const handleAddUser = async () => {
    const { name, surname, age } = formData;

    const newUser = {
      name,
      surname,
      age
    }

    try {
      const res = await fetch(url,{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser)
      });

      if(!res.ok) {
        throw new Error("Failed to add user");
      }

      const user = await res.json();

      userListDispatch({ type: ADD, user });

      setFormData(initFormData)

      console.log("User added successfully", res, user);

    } catch (error) {
      console.error("Error while adding user:", error);
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
        onChange={handleChangeInput}
        value={formData.name}
      /> 
      <Input 
        id="userSurname" 
        label="Surname"
        name="surname" 
        type="text" 
        placeholder="Insert surname" 
        onChange={handleChangeInput}
        value={formData.surname}
      /> 
      <Input 
        id="userAge" 
        label="Age" 
        name="age"
        type="number" 
        placeholder="Insert age" 
        onChange={handleChangeInput}
        value={formData.age}
      /> 
      <div className='buttons'>
        <Button label="cancel" onHandle={handleCancel}/> 
        <Button label="Add" onHandle={handleAddUser} />
      </div>
    </div>
  )
}
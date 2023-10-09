// /** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useEffect } from "react";

import { useUserContext } from '../../Context/UserContext';
import { useState } from 'react';
import { createUser } from "../../actions/userActions";
import Button from "../UI/Button";
import Input from "../UI/Input";
import { updateUser } from '../../actions/userActions';

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

    await createUser(newUser, userListDispatch);
    setFormData(initFormData);
  }

  useEffect(() => {
    if(editingUser) {
      const { name, surname, age, _id } = editingUser;
      setFormData({ name, surname, age, _id });
    }
  }, [editingUser]);

  const handleUpdateSelected = async () => {
    await updateUser(formData, userListDispatch, editingUser);
    setFormData(initFormData);
    setEditingUser(null);//Turn off update mode
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
      <div className='buttons'>
        <Button label="cancel" onHandle={handleCancel}/> 
        {!editingUser ? (
          <Button label="Add" onHandle={handleCreateUser} />
        ) : (
          <Button label="Update" onHandle={handleUpdateSelected} />
        )}
      </div>
    </div>
  )
}
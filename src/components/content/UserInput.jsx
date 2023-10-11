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

  const { 
    userListDispatch, 
    editingUser, 
    setEditingUser,
    setDataStatus
  } = useUserContext();

  const [formData, setFormData] = useState(initFormData);

  //Reset form state with all inputs and editingUser state
  const handleCancel= () => {
    setFormData(initFormData);
    setEditingUser(false);
  }

  //Listener for all inputs in form
  const handleChangeForm = (evt) => {
    setFormData({
      ...formData,
      [evt.target.name]: evt.target.value
    });
  }

  //Create a new user and send on server, fetch from server and send to reducer
  const handleCreateUser = async () => {
    const { name, surname, age } = formData;
    const newUser = { name, surname, age };
    setDataStatus("PENDING");
    const isStatusOk = await createUser(newUser, userListDispatch);
    isStatusOk ? setDataStatus("SUCCESS") : setDataStatus("ERROR");
    setFormData(initFormData);
  }

  //Set values from editing user to form inputs value 
  //always while change editingUser state (handleEditSelected from UserList.jsx)
  useEffect(() => {
    if(editingUser) {
      const { name, surname, age, _id } = editingUser;
      setFormData({ name, surname, age, _id });
    }
  }, [editingUser]);

  //Send edited user (actual form) to server, fetch response with updateted user
  //send response user to reducer, reset form state, reset editing user state
  const handleUpdateSelected = async () => {
    setDataStatus("PENDING");
    const isStatusOk = await updateUser(formData, userListDispatch, editingUser);
    isStatusOk ? setDataStatus("SUCCESS") : setDataStatus("ERROR");
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
        <Button label="Cancel" onHandle={handleCancel}/> 
        {!editingUser ? (
          <Button label="Add" onHandle={handleCreateUser} />
        ) : (
          <Button label="Update" onHandle={handleUpdateSelected} />
        )}
      </div>
    </div>
  )
}
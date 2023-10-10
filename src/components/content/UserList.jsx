// /** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useEffect, useState } from "react";

import ModalPortal from '../Modals/ModalPortal';
import Remove from '../Modals/Remove';
import { useUserContext } from '../../Context/UserContext';
import * as actions from '../../actions/userActions';
import User from "./User";

const styles = css`
  width: 100%;
  min-height: 240px;
  overflow: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 0;
  gap: 20px;
`

export default function UserList() {
  const { userList, userListDispatch, setEditingUser, setDataStatus } = useUserContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState("");

  //Automatic fetch datas from server white first render component
  useEffect(() => async () => {
    await actions.readUser(userListDispatch);
  }, []); 

  //Set user on editingUser state 
  const handleEditSelected = (user) => () => {
    setEditingUser(user);
  }

  //Open modal dialog to confirm delete selected user
  //Set selectedId state item to delete
  const handleDeleteSelected = (id) => () => {
    setIsModalOpen(true);
    setSelectedId(id);
    console.log(id);
  }


  const handleDeleteConfirmSelected = async () => {
    setDataStatus("PENDING");
    await actions.deleteUser(selectedId, userListDispatch);
    setDataStatus("SUCCESS");
    setIsModalOpen(false);
  }

  //Close modal dialog window to confirm 
  const handleCancelModal = () => {
    setIsModalOpen(false);
  }

  return (
    <>
      <div css={styles}>
        {userList.map(user => (
          <User 
            key={user._id}
            id={user._id}
            name={user.name} 
            surname={user.surname}
            age={user.age}
            onRemove={handleDeleteSelected(user._id)}
            onEdit={handleEditSelected(user)}
          />
        ))}
      </div>
      {isModalOpen && 
        <ModalPortal>
          <Remove 
            title="Remove selected user?"
            onRemove={handleDeleteConfirmSelected} 
            onCancel={handleCancelModal}
          />
        </ModalPortal>
      }
    </>
  )
}
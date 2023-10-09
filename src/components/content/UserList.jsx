// /** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useEffect, useState } from "react";

import ModalPortal from '../Modals/ModalPortal';
import Remove from '../Modals/Remove';
import { useUserContext } from '../../Context/UserContext';
import { readUser, deleteUser } from '../../actions/userActions';
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
  const { userList, userListDispatch, setEditingUser } = useUserContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState("");

  useEffect(() => async () => {
    await readUser(userListDispatch);
  }, []); 

  const handleEditSelected = (user) => () => {
    setEditingUser(user);
  }

  const handleDeleteSelected = (id) => () => {
    setIsModalOpen(true);
    setSelectedId(id);
    console.log(id);
  }

  const handleDeleteConfirmSelected = async () => {
    await deleteUser(selectedId, userListDispatch);
    setIsModalOpen(false);
  }

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
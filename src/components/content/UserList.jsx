// /** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useEffect, useState } from "react";

import ModalPortal from '../Modals/ModalPortal';
import Remove from '../Modals/Remove';
import { useUserContext } from '../../Context/UserContext';
import { userActions } from "../../constans/actions";
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
  const { READ, DELETE_SELECTED } = userActions;
  const { userList, userListDispatch, setEditingUser } = useUserContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState("");

  const url = "https://places-arw.vercel.app/api/people";
  const urlId = `https://places-arw.vercel.app/api/people/${selectedId}`;
  const errorRes = "Network response was not ok";

  const fetchData = async () => {
    try {
      const res = await fetch(url);
      
      if(!res.ok) {
        throw new Error(errorRes);
      }

      const users = await res.json();

      userListDispatch({type: READ, users});

    } catch(error) {
      console.error(errorRes, error);
    }
  };

  useEffect(() => {fetchData()}, []); 

  const handleEditSelected = (user) => () => {
    console.log("Editing user:", user._id);
    setEditingUser(user);
  }

  const handleDeleteSelected = (id) => () => {
    setIsModalOpen(true);
    setSelectedId(id)
  }

  const handleDeleteConfirmSelected = async () => {
    try {
      if(!selectedId) {
        console.error("No selected user ID to remove.");
        return;
      }

      const res = await fetch(urlId, {method: "DELETE"});

      if (!res.ok) {
        throw new Error("Failed to remove selected user");
      }

      userListDispatch({type: DELETE_SELECTED, selectedId});
      setIsModalOpen(false);

      console.log(res, selectedId);
    } catch (error) {
      console.error("Error while deletion user:", error);
    }
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
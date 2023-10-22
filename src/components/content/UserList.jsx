/* eslint-disable react/no-unknown-property */
// /** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import * as actions from '../../Redux/actions/userActions';
import ModalPortal from '../Modals/ModalPortal';
import Remove from '../Modals/Remove';
import { useUserContext } from '../../Context/UserContext';
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
  const {  
    setEditingUser, 
    setDataStatus,
    changeDataStatus 
  } = useUserContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState("");

  const userList = useSelector(store => store.userList);
  const dispatch= useDispatch();

  //Set user on editingUser state 
  const handleEditSelected = (user) => () => {
    setEditingUser(user);

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    })
  }

  //Open modal dialog to confirm delete selected user
  //Set selectedId state item to delete
  const handleDeleteSelected = (id) => () => {
    setIsModalOpen(true);
    setSelectedId(id);
    console.log(id);
  }

  const handleDeleteConfirmSelected = () => {
    setDataStatus({status: "PENDING"});

    dispatch(actions.deleteUser(selectedId))
    .then((isError) => {
      isError
      ? changeDataStatus({status: "ERROR", msg: isError, isAutoHide: false})
      : changeDataStatus({status: "SUCCESS"});
    })

    setIsModalOpen(false);
  }

  //Close modal dialog window to confirm 
  const handleCancelModal = () => {
    setIsModalOpen(false);
  }

  const handleDisplayUser = (user) => () => {
    console.log("User displayed", user._id);
  }

  return (
    <>
      <div css={styles}>
        {userList.length !== 0 
          ? userList.map(user => (
            <User 
              key={user._id}
              user={user}
              onRemove={handleDeleteSelected(user._id)}
              onEdit={handleEditSelected(user)}
              onDisplay={handleDisplayUser(user)}
            />
            )) : (<p>No Results...</p>)}
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
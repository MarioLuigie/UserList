// /** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useState } from 'react';

import { useUserContext } from '../../Context/UserContext';
import { userActions } from '../../constans/actions';
import ModalPortal from '../Modals/ModalPortal';
import Remove from '../Modals/Remove';
import Button from "../UI/Button";

const styles = css`
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 30px 0;
`

export default function Controls() {
  const url = "https://places-arw.vercel.app/api/people";
  const { DELETE_ALL } = userActions;
  const { userList, userListDispatch } = useUserContext();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDeleteAll = () => {
    setIsModalOpen(true);
  }

  const handleDeleteConfirmAll = async () => {
    try {
      const res = await fetch(url, {method: "DELETE"});

      if(!res.ok) {
        throw new Error("Failed to delete users.");
      }
  
      userListDispatch({type: DELETE_ALL});
      handleCancelModal();
      console.log(res);
    } catch (error) {
      console.error("Error while deletion users:", error);
    }
  }

  const handleCancelModal = () => {
    setIsModalOpen(false);
  }

  return (
    <>
      <div css={styles}>
        <Button label="Remove All" onHandle={handleDeleteAll} />
      </div>
      {(isModalOpen && userList.length > 0) && 
        <ModalPortal>
          <Remove 
            title="Remove all users completely?"
            onRemove={handleDeleteConfirmAll} 
            onCancel={handleCancelModal}
          />
        </ModalPortal>
      }
    </>
  )
}
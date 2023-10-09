// /** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useState } from 'react';

import { useUserContext } from '../../Context/UserContext';
import ModalPortal from '../Modals/ModalPortal';
import Remove from '../Modals/Remove';
import Button from "../UI/Button";
import { deleteAll } from "../../actions/userActions";

const styles = css`
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 30px 0;
`

export default function Controls() {
  const { userList, userListDispatch } = useUserContext();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCancelModal = () => {
    setIsModalOpen(false);
  }

  const handleDeleteAll = () => {
    setIsModalOpen(true);
  }

  const handleDeleteConfirmAll = async () => {
    await deleteAll(userListDispatch)
    handleCancelModal();
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
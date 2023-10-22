/* eslint-disable react/no-unknown-property */
// /** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import * as actions from "../../Redux/actions/userActions";
import { useUserContext } from '../../Context/UserContext';
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
  const { 
    setDataStatus,
    changeDataStatus 
  } = useUserContext();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const userList = useSelector(store => store.userList);
  const dispatch = useDispatch();

  const handleCancelModal = () => {
    setIsModalOpen(false);
  }

  const handleDeleteAll = () => {
    setIsModalOpen(true);
  }

  const handleDeleteConfirmAll = () => {
    setDataStatus({status: "PENDING"});

    dispatch(actions.deleteAll())
    .then((isError) => {
      isError 
      ? changeDataStatus({status: "ERROR", msg: isError, isAutoHide: false})
      : changeDataStatus({status: "SUCCESS"});
    })

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
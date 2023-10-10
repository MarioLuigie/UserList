// /** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRectangleXmark } from '@fortawesome/free-solid-svg-icons';
import ReactDOM from "react-dom";
import { useEffect, useState } from "react";

import { useUserContext } from '../../Context/UserContext';
import { dataStatuses as status } from '../../constans/dataStatuses';

const styles = (data, translate) => css` 
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 30px;
  padding: 25px;
  background-color: ${data.color};
  backdrop-filter: blur(10px);
  transform: ${translate};
  transition: 0.3s ease-in;

  .info {
    font-size: 1.5rem;
    color: white;
  }

  .close {
    font-size: 2rem;
    color: #ffffffe2;
    cursor: pointer;
    background-color: transparent;

    &:hover {
      color: #e6e6e6;
    }

    &:active {
      transform: scale(0.90);
    }
  }
`

export default function DataStatusLabel() {
  const [translate, setTranslate] = useState("");
  const { dataStatus, setDataStatus } = useUserContext();
  let data = null;

  const statusesTypes = {
    success: {
      color: "#64f3a0dd",
      text: "Action completed successfully!",
    },
    error: {
      color: "#f06161d8",
      text: "The action ended in failure!",
    },
    pending: {
      color: "#ffad60da",
      text: "Waiting for result...",
    }
  }

  const handleCloseStatusData = () => {
    setTranslate("translate(0, -100px)");
  }

  useEffect(() => {
    if(dataStatus) {
      setTranslate("translate(0, 0)");
      setTimeout(() => {
        setTranslate("translate(0, -100px)");
      }, 2000);
    }
  }, [dataStatus]);

  switch(dataStatus) {
    case status.SUCCESS:
      data = {...statusesTypes.success};
      break;
    case status.ERROR:
      data = {...statusesTypes.error};
      break;
    case status.PENDING:
      data = {...statusesTypes.pending};
      break;
  }

  return ReactDOM.createPortal(
    <div css={styles(data, translate)}>
        <p className='info'>{data.text}</p>
        <button className='close' onClick={handleCloseStatusData}>
          <FontAwesomeIcon icon={faRectangleXmark} />
        </button>
    </div>,
    document.getElementById("portal")
  )
}
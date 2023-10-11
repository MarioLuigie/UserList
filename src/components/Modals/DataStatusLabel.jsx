// /** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRectangleXmark } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from "react";
import ReactDOM from "react-dom";

import { useUserContext } from '../../Context/UserContext';
import { dataStatuses as status } from '../../constans/dataStatuses';

const styles = (data, translate) => css` 
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 3;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 30px;
  padding: 25px;
  background-color: ${data.bgColor};
  backdrop-filter: ${data.fog};
  transform: ${translate};
  transition: 0.3s ease-in;

  .info {
    font-size: 1.5rem;
    color: ${data.color};
  }

  .close {
    font-size: 2rem;
    color: ${data.color};
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

  //Object with styles and datas for notification
  const statusesTypes = {
    success: {
      bgColor: "#64f3a0dd",
      fog: "blur(10px)",
      text: "Action completed successfully!",
      color: "white"
    },
    error: {
      bgColor: "#f06161d8",
      fog: "blur(10px)",
      text: "The action ended in failure!",
      color: "white"
    },
    pending: {
      bgColor: "#ffad60da",
      fog: "blur(10px)",
      text: "Waiting for result...",
      color: "white"
    },
    default: {
      bgColor: "transparent",
      fog: "none",
      text: "",
      color: "transparent"
    }
  }

  const handleCloseStatusData = () => {
    setTranslate("translate(0, -400px)");
  }

  //UseEffect set translate value
  useEffect(() => {
      setTranslate("translate(0, 0)");
      const timeout = setTimeout(() => {
        setTranslate("translate(0, -400px)");
      }, 4000);
      return () => clearTimeout(timeout);
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
    default:
      data = {...statusesTypes.default};
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
// /** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRectangleXmark } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from "react";
import ReactDOM from "react-dom";

import { useUserContext } from '../../Context/UserContext';
import { dataStatuses as status } from '../../constans/dataStatuses';

const styles = (data, translate, isOnTop) => css` 
  width: 100%;
  position: fixed;
  top: ${isOnTop ? 0 : "auto"};
  left: 0;
  bottom: ${isOnTop ? "auto" : 0};
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
  //Notification location control function using one variable
  const isOnTop = true;
  const localNotifications = {
    start: "translate(0, 0)",
    onTop: "translate(0, -400px)",
    onBottom: "translate(0, 400px)"
  }
  //Object with properties dependent on dataStatus state for css and jsx
  let data = null;

  const [translate, setTranslate] = useState("");
  const { dataStatus } = useUserContext();

  //Object with styles and datas for notification
  const statusesTypes = {
    success: {
      bgColor: "#64f3a0dd",
      fog: "blur(10px)",
      text: "Action completed successfully!",
      color: "white",
    },
    error: {
      bgColor: "#f06161d8",
      fog: "blur(10px)",
      text: `${dataStatus.msg ? dataStatus.msg : "The action ended in failure!"}`,
      color: "white",
    },
    pending: {
      bgColor: "#ffad60da",
      fog: "blur(10px)",
      text: "Waiting for result...",
      color: "white",
    },
    default: {
      bgColor: "transparent",
      fog: "none",
      text: "",
      color: "transparent",
    }
  }

  //Closing notofication
  const handleCloseStatusData = () => {
    setTranslate(
      isOnTop 
        ? localNotifications.onTop 
        : localNotifications.onBottom
    );
  }

  //UseEffect set translate value
  useEffect(() => {
      setTranslate(localNotifications.start);
      if(dataStatus.isAutoHide) {
        const timeout = setTimeout(() => {
        handleCloseStatusData(); 
        }, 3000);

        return () => clearTimeout(timeout);
      }
  }, [dataStatus]);

  //Setting the properties of the data object depending on the dataStatus
  switch(dataStatus.status) {
    case status.SUCCESS:
      data = {...statusesTypes.success};
      break;
    case status.ERROR:
      data = {...statusesTypes.error};
      break;
    case status.PENDING:
      data = {...statusesTypes.pending};
      break;
    case status.DEFAULT:
      data = {...statusesTypes.default};
  }

  return ReactDOM.createPortal(
    <div css={styles(data, translate, isOnTop)}>
        <p className='info'>{data.text}</p>
        <button className='close' onClick={handleCloseStatusData}>
          <FontAwesomeIcon icon={faRectangleXmark} />
        </button>
    </div>,
    document.getElementById("portal")
  )
}
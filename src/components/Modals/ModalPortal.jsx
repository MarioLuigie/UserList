// /** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import ReactDOM from "react-dom";

const styles = css`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #0e0e0e88;
  backdrop-filter: blur(8px);

  .modal {
    width: 350px;
    height: 200px;
    background-color: #f5f5f5;
    border-radius: 6px;
    box-shadow: #000000b7 0 0 20px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`

export default function ModalPortal({ children }) {

  return ReactDOM.createPortal(
    <div css={styles}>
      <div className='modal'>
        {children}
      </div>
    </div>,
    document.getElementById("portal")
  )
}
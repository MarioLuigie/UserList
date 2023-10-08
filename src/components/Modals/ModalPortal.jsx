// /** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import ReactDOM from "react-dom";
import { useEffect, useState } from "react";

const styles = (modalPosition, modalHeight) => css`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: #0e0e0e88;
  backdrop-filter: blur(8px);
  display: flex;
  justify-content: center;

  .modal {
    width: 350px;
    height: ${modalHeight}px;
    background-color: #f5f5f5;
    border-radius: 6px;
    box-shadow: #000000b7 0 0 20px;
    position: fixed;
    top: ${modalPosition.top};
    left: ${modalPosition.left};
    transform: translate(-50%, -50%);
    display: flex;
    justify-content: center;
    align-items: center;
  }
`

export default function ModalPortal({ children }) {
  const modalHeight = 200; 
  const [
    modalPosition, 
    setModalPosition
  ] = useState({ top: '50%', left: '50%' });

  useEffect(() => {
    const handleScroll = () => {
      const viewportHeight = window.innerHeight;
      const topPosition = Math.max((viewportHeight - modalHeight) / 2, 0);

      setModalPosition({
        top: `${topPosition + window.scrollY}px`,
        left: '50%',
      });
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return ReactDOM.createPortal(
    <div css={[styles(modalPosition, modalHeight)]}>
      <div className='modal'>
        {children}
      </div>
    </div>,
    document.getElementById("portal")
  )
}
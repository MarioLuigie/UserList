// /** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

const styles = css`


  .button {
    padding: 10px 0;
    width: 100px;
    font-size: 1rem;
    border-radius: 6px;
    box-shadow: #0000008f 0 0 7px;
    background-color: #eb2424;
    color: white;
    cursor: pointer;

    &:hover {
      background-color: #ff1f1f;
    }

    &:active {
      transform: scale(0.95);
    }
   }
`

export default function Button({
  label,
  onHandle
}) {

  return (
    <div css={styles}>
      <button className='button' onClick={onHandle}>{label}</button>
    </div>
  )
}
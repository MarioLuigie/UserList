// /** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

import { header } from "../../constans/dimensions";

const styles = css`
  display: flex;
  justify-content: center;
  align-items: center;
  height: ${header.height}px;
  background-color: #d1d1d1;

  .title {
    font-size: 55px;
    color: #f3f3f3;
    text-shadow: #1f1f1f52 0 0 14px;
  }
`

export default function Header({
  title
}) {
  return (
    <div css={styles}>
      <h1 className='title'>{title}</h1>
    </div>
  )
}
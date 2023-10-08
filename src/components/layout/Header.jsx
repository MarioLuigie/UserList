// /** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

import { header } from "../../constans/dimensions";

const styles = css`
  display: flex;
  justify-content: center;
  align-items: center;
  height: ${header.height}px;
  background-color: #181818;

  .title {
    font-size: 65px;
    color: #cecece;

    span {
      font-weight: 100;
      padding-left: 10px;
    }
  }
`

export default function Header({
  title
}) {
  return (
    <div css={styles}>
      <h1 className='title'>{title}<span>&reg;</span></h1>
    </div>
  )
}
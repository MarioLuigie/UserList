// /** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

import { footer } from "../../constans/dimensions";

const styles = (height) => css`
  display: flex;
  justify-content: center;
  align-items: center;
  height: ${height}px;
  background-color: #d1d1d1;

  .signature {
    font-size: 0.75rem;
  }

`

export default function Footer({
  signature
}) {
  const { height } = footer;

  return (
    <div css={styles(height)}>
      <p className='signature'>{signature}</p>
    </div>
  )
}
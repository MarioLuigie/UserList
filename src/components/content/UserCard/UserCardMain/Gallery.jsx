/* eslint-disable react/no-unknown-property */
// /** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

const styles = css`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  /* background-color: green; */

  .example {

  }
`

export default function Gallery() {
  console.log("Gallery Mariusz");
  
  return (
    <div css={styles}>
      gallery
    </div>
  )
}
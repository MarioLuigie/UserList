/* eslint-disable react/no-unknown-property */
// /** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

const styles = css`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;


  .example {

  }
`

export default function About() {
  console.log("About Mariusz");
  return (
    <div css={styles}>
      about
    </div>
  )
}
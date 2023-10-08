// /** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

import { container } from "../../constans/dimensions";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";

const styles = (width, minWidth, maxWidth) => css`
  width: ${width}%;
  min-width: ${minWidth}px;
  max-width: ${maxWidth}px;
  border-inline: #bebebe 1px solid;
  box-sizing: border-box;

  @media screen and (min-width: 780px) {
    width: 80%;
  }
`

export default function Container() {
  const { width, minWidth, maxWidth } = container;
  
  return (
    <div css={styles(width, minWidth, maxWidth)}>
      <Header title="Your Places" />
      <Main />
      <Footer signature="ARWcode 2023" />
    </div>
  )
}
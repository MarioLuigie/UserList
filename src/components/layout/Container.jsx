// /** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

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
      <Router>
        <Header title="Your Places" />
        <Routes>
          <Route exact path={"/"} element={<Main />}/>
        </Routes>
        <Footer signature="ARWcode 2023" />
      </Router>
    </div>
  )
}
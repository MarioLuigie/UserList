/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unknown-property */
// /** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import * as actions from '../../actions/userActions';
import { container } from "../../constans/dimensions";
import Header from "./Header";
import Main from "./Main";
import UserCard from "../content/UserCard/UserCard";
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

  const dispatch = useDispatch();

  //Automatic fetch datas from server white first render component
  useEffect(() => async () => {
    console.log("useEffect - datas readed");
    await actions.readUser(dispatch);
  }, []); 
  
  return (
    <div css={styles(width, minWidth, maxWidth)}>
      <Router>
        <Header title="Your Places" />
        <Routes>
          <Route exact path={"/"} element={<Main />}/>
          <Route path={"/user/:id/*"} element={<UserCard />}/>
        </Routes>
        <Footer signature="ARWcode 2023" />
      </Router>
    </div>
  )
}
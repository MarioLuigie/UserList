/* eslint-disable react/no-unknown-property */
// /** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Routes, Route } from 'react-router-dom';
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import About from "./About";
import Gallery from "./Gallery";
import Places from "./Places";
import Contact from "./Contact";

const styles = css`
  width: 100%;
  height: 365px;
  min-height: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;

  .nav {
    width: 100%;
    display: flex;
    justify-content: center;
  }

  .navList {
    width: 100%;
    display: flex;
    gap: 2px;
    justify-content: center;
    list-style: none;

    li {
      width: 100%;
      font-size: 1rem;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #d8d8d8;
      cursor: pointer;
      border-radius: 3px;

      &:hover {
        background-color: #cfcfcf;
      }

      a {
        padding: 10px 0;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        text-decoration: none;
        color: #4e4e4e;
      }
    }
  }

  .userSites {
    display: flex;
    justify-content: center;
    width: 100%;
    height: 100%;
  }

`

export default function UserCardMain({
  user
}) {
  const navListLabels = [
    "about",
    "gallery",
    "places",
    "contact"
  ];

  console.log(user);

  const navList = navListLabels.map((navItem, i) => {
    if (user) {
      // console.log(navItem);
      // console.log(user?._id);
      return (
        <li key={i}>
          <Link to={`/user/${user._id}/${navItem}`} >{navItem}</Link>
        </li>
      )
    }
});

  return (
    <div css={styles}>
      <div className='nav'>
        <ul className='navList'>
          {navList}
        </ul>
      </div>
      <div className='userSites'>
        <Routes>
          <Route path={"/about"} element={<About />} />
          <Route path={"/gallery"} element={<Gallery />} />
          <Route path={"/places"} element={<Places />} />
          <Route path={"/contact"} element={<Contact />} />
        </Routes>
      </div>
    </div>
  )
}

UserCardMain.propTypes = {
  user: PropTypes.object
}
/* eslint-disable react/no-unknown-property */
// /** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faUserAstronaut } from '@fortawesome/free-solid-svg-icons';
import PropTypes from "prop-types";

const styles = css`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #e7e7e7;

  .buttons {
    width: 100%;
    display: flex;
    background-color: #f1f1f1;
  }

  .backButton {
    font-size: 40px;
    padding: 15px 25px;
    background-color: transparent;
  }

  .userDetails {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;

    header {
      width: 100%;
      min-height: 60px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-bottom: #c0c0c0 1px solid;
      font-size: 1.8rem;
      color: #5c5c5c;
    }

    main {
      width: 100%;
      min-height: 100px;
      padding: 15px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-bottom: #c0c0c0 1px solid;
    }

    footer {
      width: 100%;
      padding: 10px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 0.8rem;
      color: #979797;
    }
  }

  .infos {
    font-size: 1.2rem;
    padding-right: 120px;
    color: #9e9e9e;

    span {
      color: #686868;

    }
  }

  .avatar {
    font-size: 120px;
    color: #b93e77;
  }
`

export default function UserCardHeader({
  user,
}) {

  return (
    <div css={styles}>
      <div className='buttons'>
        <button className='backButton'>
          <Link to={"/"}><FontAwesomeIcon icon={faChevronLeft} /></Link>
        </button>
      </div>
      <div className='userDetails'>
        <header>
          <p>Logistic</p>
        </header>
        <main>
          <div className='infos'>
            <p>Name: <span>{user?.name}</span></p>
            <p>Surname: <span>{user?.surname}</span></p>
            <p>Age: <span>{user?.age}</span></p>
          </div>
          <div>
            <div className='avatar instagram'>
              <FontAwesomeIcon icon={faUserAstronaut} className='instagram'/>
            </div>
          </div>
        </main>
        {/* <footer>
          <p>id:{params.id}</p>
        </footer> */}
      </div>
    </div>
  )
}

UserCardHeader.propTypes = {
  user: PropTypes.object
}
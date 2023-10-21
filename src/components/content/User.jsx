/* eslint-disable react/no-unknown-property */
// /** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faUser, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const styles = css`
  display: flex;
  flex-direction: column;
  width: 90%;
  background-color: #d6d6d6;
  border-radius: 6px;
  box-shadow: #0000007b 0 0 10px;

  .controls {
    width: 100%;
    background-color: #c0c0c0;
    border-top-left-radius: 6px;
    border-top-right-radius: 6px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 8px 22px;
    font-size: 22px;
    color: #636363;

    .icons {
      display: flex;
      gap: 12px;
    }

    .icons div {
      cursor: pointer;

      &:hover {
        color: #868686;
      }
    }

    .id {
      font-size: 14px;
      color: #8f8f8f;
    }
  }

  .userInfo {
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 15px 25px;
  }

  .userData {
    font-size: 1rem;
    color: #5f5f5f;

    span {
      color: #a0a0a0;
    }
  }

  .userAvatar {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #cccccc;
    width: 70px;
    aspect-ratio: 1;
    border-radius: 6px;
    color: #a0a0a0;
  }

`

export default function User({
  user,
  onRemove,
  onEdit,
}) {

  return (
    <div css={styles} id={user._id}>
      <div className='controls'>
        <div className='id'><p>ID: {user._id}</p></div>
        <div className='icons'>
          <Link to={`/user/${user._id}/about`}>
            <FontAwesomeIcon icon={faUser} />
          </Link>
          <div onClick={onEdit}>
            <FontAwesomeIcon icon={faPenToSquare} />
          </div>
          <div onClick={onRemove}>
            <FontAwesomeIcon icon={faTrash} />
          </div>
        </div>
      </div>
      <div className='userInfo'>
        <div className='userData'>
          <p><span>Name: </span>{user.name}</p>
          <p><span>Surname: </span>{user.surname}</p>
          <p><span>Age: </span>{user.age}</p>
        </div>
        <div className='userAvatar'>IMAGE</div>
      </div>
    </div>
  )
}

User.propTypes = {
  user: PropTypes.object,
  onRemove: PropTypes.func,
  onEdit: PropTypes.func,
}
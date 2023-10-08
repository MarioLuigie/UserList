// /** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';

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
  id,
  name,
  surname,
  age,
  onRemove
}) {

  return (
    <div css={styles} id={id}>
      <div className='controls'>
        <div className='id'><p>ID: {id}</p></div>
        <div className='icons'>
          <div>
            <FontAwesomeIcon icon={faPenToSquare} />
          </div>
          <div onClick={onRemove}>
            <FontAwesomeIcon icon={faTrash} />
          </div>
        </div>
      </div>
      <div className='userInfo'>
        <div className='userData'>
          <p><span>Name: </span>{name}</p>
          <p><span>Surname: </span>{surname}</p>
          <p><span>Age: </span>{age}</p>
        </div>
        <div className='userAvatar'>IMAGE</div>
      </div>
    </div>
  )
}
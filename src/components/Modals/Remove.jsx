/* eslint-disable react/no-unknown-property */
// /** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import PropTypes from "prop-types";

import Button from "../UI/Button";

const styles = css`

  .title {
    width: 100%;
    text-align: center;
    font-size: 1.2rem;
    padding-bottom: 35px;
  }

  .buttons {
    width: 100%;
    display: flex;
    justify-content: center;
    gap: 20px;
  }
`

export default function Remove({
  title,
  onRemove,
  onCancel,
}) {

  return (
    <div css={styles}>
      <p className='title'>{title}</p>
      <div className='buttons'>
        <Button label="Cancel" onHandle={onCancel} />
        <Button label="Done" onHandle={onRemove} />
      </div>
    </div>
  )
}

Remove.propTypes = {
  title: PropTypes.string,
  onRemove: PropTypes.func,
  onCancel: PropTypes.func
}
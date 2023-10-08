// /** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

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
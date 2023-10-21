/* eslint-disable react/no-unknown-property */
// /** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import PropTypes from "prop-types";

import { footer } from "../../constans/dimensions";

const styles = (height) => css`
  display: flex;
  justify-content: center;
  align-items: center;
  height: ${height}px;
  background-color: #181818;
  border-top: #adadad 1px solid;

  .signature {
    font-size: 0.75rem;
    color: white;
    background: linear-gradient(to right, #ffc04b, #fd478d);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
  }

`

export default function Footer({
  signature
}) {
  const { height } = footer;

  return (
    <div css={styles(height)}>
      <p className='signature'>{signature} &copy;</p>
    </div>
  )
}

Footer.propTypes = {
  signature: PropTypes.string
}
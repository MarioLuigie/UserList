// /** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useEffect, useState } from "react";

import Container from "./layout/Container";

const styles = css`
  display: flex;
  justify-content: center;
`

export default function App() {


  return (
    <div css={styles}>
      <Container />
    </div>
  )
}





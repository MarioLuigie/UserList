// /** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

import Container from "./layout/Container";
import DataStatusLabel from './Modals/DataStatusLabel';

const styles = css`
  display: flex;
  justify-content: center;
`

export default function App() {

  return (
    <div css={styles}>
      <Container />
      <DataStatusLabel />
    </div>
  )
}





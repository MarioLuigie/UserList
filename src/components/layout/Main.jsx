/* eslint-disable react/no-unknown-property */
// /** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

import { header, footer } from "../../constans/dimensions";
import UserInput from "../content/UserInput";
import UserList from "../content/UserList";
import Controls from "../content/Controls";

const styles = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: calc(100vh - ${header.height + footer.height}px);

`

export default function Main() {

  return (
    <div css={styles}>
      <UserInput />
      <UserList />
      <Controls />
    </div>
  )
}
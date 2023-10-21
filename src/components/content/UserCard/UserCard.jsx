/* eslint-disable react/no-unknown-property */
// /** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useParams } from 'react-router';

import { useUserContext } from '../../../Context/UserContext';
import UserCardHeader from "./UserCardHeader";
import UserCardMain from "./UserCardMain/UserCardMain";
import { header, footer } from "../../../constans/dimensions";

const styles = css`
  width: 100%;
  min-height: calc(100vh - ${header.height + footer.height}px);
`

export default function UserCard() {
  const params = useParams();
  const { userList } = useUserContext();

  const user = userList.find(user => user._id === params.id);

  return (
    <div css={styles}>
        <UserCardHeader user={user} />
        <UserCardMain user={user} />
    </div>
  )
}
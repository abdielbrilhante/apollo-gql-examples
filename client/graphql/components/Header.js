import * as React from 'react';
import { gql, useQuery } from '@apollo/client';

import { TopBar } from '../../shared/components/TopBar';

const accountQuery = gql`
  query accountQuery {
    userInfo {
      id
      firstName
      lastName
      profilePicture
    }
  }
`;

export const Header = () => {
  const { data } = useQuery(accountQuery);

  return <TopBar account={data?.userInfo} />;
};

import * as React from 'react';
import { gql, useQuery } from '@apollo/client';

import { ReservationList } from '../../shared/components/ReservationList';

const reservationsQuery = gql`
  query reservationsQuery {
    reservations {
      id
      startDate
      endDate
      canceled
      hotel {
        id
        name
        address
        city
        state
      }
    }
  }
`;

export const Reservations = () => {
  const { data, networkStatus, error } = useQuery(reservationsQuery, {
    fetchPolicy: 'cache-and-network',
    notifyOnNetworkStatusChange: true,
  });

  console.error(error);
  const initialLoading = networkStatus === 1;

  return (
    <ReservationList
      items={data?.reservations}
      loading={!data && initialLoading}
    />
  );
};

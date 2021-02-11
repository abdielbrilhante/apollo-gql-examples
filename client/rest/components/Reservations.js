import * as React from 'react';
import { useSelector } from 'react-redux';

import store from '../rematch/store';
import { ReservationList } from '../../shared/components/ReservationList';

export const Reservations = () => {
  React.useEffect(() => {
    store.dispatch({ type: 'reservation/fetch' });
  }, []);

  const { list, loading } = useSelector((state) => state.reservation);

  return <ReservationList items={list} loading={loading} />;
};

import * as React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import store from '../rematch/store';
import { HotelDetails } from '../../shared/components/HotelDetails';

export const Hotel = () => {
  const params = useParams();

  React.useEffect(() => {
    if (params.id) {
      store.dispatch({ type: 'hotel/fetchById', payload: params.id });
    }
  }, [params]);

  const placeReservation = (payload) => store.dispatch({
    type: 'reservation/create',
    payload,
  });

  const { hotel, loading } = useSelector((state) => ({
    hotel: state.hotel.byId?.[params.id],
    loading: state.hotel.byIdLoading,
  }));

  return (
    <HotelDetails hotel={hotel} loading={loading} placeReservation={placeReservation} />
  );
};

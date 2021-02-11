import * as React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { gql, useMutation, useQuery } from '@apollo/client';

import { HotelDetails } from '../../shared/components/HotelDetails';

const hotelDetailsQuery = gql`
  query hotelDetailsQuery($id: ID!) {
    hotel(id: $id) {
      id
      name
      starRating
      averageRating
      description
      thumbnail
      address
      city
      state
      zipcode
      pictures
      reviews {
        id
        comments
        rating
        user {
          id
          firstName
          lastName
        }
      }
    }
  }
`;

const placeReservationMutation = gql`
  mutation placeReservationMutation($hotelId: ID!, $startDate: String!, $endDate: String!) {
    placeReservation(hotelId: $hotelId, startDate: $startDate, endDate: $endDate) {
      id
    }
  }
`;

export const Hotel = () => {
  const params = useParams();
  const navigate = useNavigate();

  const { data, loading } = useQuery(hotelDetailsQuery, {
    fetchPolicy: 'network-only',
    variables: {
      id: params.id,
    },
  });

  const [placeReservation, { data: reservationData }] = useMutation(placeReservationMutation);

  React.useEffect(() => {
    if (reservationData) {
      navigate('/reservations');
    }
  }, [reservationData]);

  return (
    <HotelDetails
      hotel={data?.hotel}
      loading={loading}
      placeReservation={(values) => placeReservation({ variables: values })}
    />
  );
};

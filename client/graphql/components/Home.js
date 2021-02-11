import * as React from 'react';
import { useQuery, gql } from '@apollo/client';

import { SearchBox } from '../../shared/components/SearchBox';
import { HotelList } from '../../shared/components/HotelList';
import { Content } from '../../shared/components/Content';

const hotelSearchQuery = gql`
  query hotelsQuery($search: String!) {
    hotels(search: $search) {
      id
      name
      starRating
      averageRating
      thumbnail
      address
      city
      state
    }
  }
`;

export const Home = () => {
  const [search, setSearch] = React.useState('');
  const { data, loading } = useQuery(hotelSearchQuery, {
    variables: { search },
    skip: !search,
  });

  return (
    <Content>
      <SearchBox onInput={setSearch} />
      <HotelList items={data?.hotels} loading={loading} />
    </Content>
  );
};

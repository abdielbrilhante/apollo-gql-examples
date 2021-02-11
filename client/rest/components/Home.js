import * as React from 'react';
import { useSelector } from 'react-redux';

import store from '../rematch/store';
import { SearchBox } from '../../shared/components/SearchBox';
import { HotelList } from '../../shared/components/HotelList';
import { Content } from '../../shared/components/Content';

export const Home = () => {
  const fetchData = React.useCallback((searchInput) => {
    if (searchInput) {
      store.dispatch({ type: 'hotel/search', payload: searchInput });
    } else {
      store.dispatch({ type: 'hotel/setList', payload: null });
    }
  });

  const { list, listLoading } = useSelector((state) => state.hotel ?? {});

  return (
    <Content>
      <SearchBox onInput={fetchData} />
      <HotelList items={list} loading={listLoading} />
    </Content>
  );
};

import * as React from 'react';
import { useSelector } from 'react-redux';
import { TopBar } from '../../shared/components/TopBar';
import store from '../rematch/store';

export const Header = () => {
  React.useEffect(() => {
    store.dispatch({ type: 'user/fetch' });
  }, []);

  const user = useSelector((state) => state.user);
  return <TopBar account={user} />;
};

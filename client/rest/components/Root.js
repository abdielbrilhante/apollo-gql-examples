import * as React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import store from '../rematch/store';
import { Home } from './Home';
import { Hotel } from './Hotel';
import { Reservations } from './Reservations';
import { Header } from './Header';

export const Root = () => {
  return (
    <Provider store={store}>
      <Header />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/hotels/:id" element={<Hotel />} />
        <Route path="/reservations" element={<Reservations />} />
      </Routes>
    </Provider>
  );
};

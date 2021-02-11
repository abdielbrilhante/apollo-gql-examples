import * as React from 'react';
import { Route, Routes } from 'react-router-dom';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://localhost:9595/graphql',
  cache: new InMemoryCache(),
});

import { Home } from './Home';
import { Hotel } from './Hotel';
import { Reservations } from './Reservations';
import { Header } from './Header';

export const Root = () => {
  return (
    <ApolloProvider client={client}>
      <Header />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/hotels/:id" element={<Hotel />} />
        <Route path="/reservations" element={<Reservations />} />
      </Routes>
    </ApolloProvider>
  );
};

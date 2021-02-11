import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';
import styled from 'styled-components';

import { Root as RestRoot } from './rest/components/Root';
import { Root as GraphRoot } from './graphql/components/Root';

const Container = styled.div`
  svg.illustration {
    display: block;
    height: auto;
    margin: 48px auto 0;
    width: 360px;
  }
`;

const ENABLE_GQL = false;

export const App = () => {
  return (
    <Container>
      <BrowserRouter>
        {ENABLE_GQL ? <GraphRoot /> : <RestRoot />}
      </BrowserRouter>
    </Container>
  );
};

import * as React from 'react';
import styled from 'styled-components';

import { Case, Switch } from '../utils/Switch';
import Loading from '../assets/Loading.svg';
import NoDataIllustration from '../assets/NoDataIllustration.svg';
import { Content } from './Content';

const ReservationsTable = styled.table`
  background-color: white;
  border: none;
  border-radius: 4px;
  box-shadow: 0 12px 36px -12px rgba(0, 30, 60, 0.25);
  width: 100%;

  th, td {
    padding: 12px 12px;
    text-align: left;
  }
`;

const ReservationRow = styled.tr`
  background-color: ${({ canceled }) => canceled ? '#B8336A10' : 'white'};

  td {
    border-top: 1px solid #F0F2F4;
  }

  button {
    background-color: #B8336A;
    border: none;
    border-radius: 4px;
    color: white;
    cursor: pointer;
    font-size: 16px;
    height: 32px;
    line-height: 32px;
    padding: 0 16px;
  }
`;

function format(date) {
  return new Date(date).toLocaleDateString();
}

export const ReservationList = ({ items, loading }) => {
  return (
    <Switch>
      <Case condition={loading} render={() => <Loading className="illustration" />} />
      <Case condition={!items?.length} render={() => <NoDataIllustration className="illustration" />} />
      <Case
        default
        render={() => (
          <Content>
            <ReservationsTable cellSpacing="0">
              <thead>
                <tr>
                  <th>Hotel</th>
                  <th>Address</th>
                  <th>In at</th>
                  <th>Out at</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <ReservationRow key={item.id} canceled={item.canceled}>
                    <td>{item.hotel.name}</td>
                    <td>{item.hotel.address}, {item.hotel.city} {item.hotel.state}</td>
                    <td>{format(item.startDate)}</td>
                    <td>{format(item.endDate)}</td>
                    <td>{!item.canceled && <button>Cancel</button>}</td>
                  </ReservationRow>
                ))}
              </tbody>
            </ReservationsTable>
          </Content>
        )}
      />
    </Switch>
  );
};

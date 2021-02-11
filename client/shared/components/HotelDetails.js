import * as React from 'react';
import styled from 'styled-components';

import Loading from '../assets/Loading.svg';
import { Switch, Case } from '../utils/Switch';
import { Content } from './Content';

// FIXME: styles are a bit of a mess

const Checkout = styled.div`
  .pictures {
    img {
      height: 320px;
      object-fit: cover;
      width: calc(100% / 3);
    }
  }
`;

const Button = styled.button`
  background-color: #28536B;
  border: none;
  border-radius: 4px;
  color: white;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  height: 48px;
  line-height: 48px;
  padding: 0 24px;

  &:hover {
    background-color: #38637B;
  }
`;

const Actions = styled.form`
  display: flex;
  align-items: center;
  justify-content: flex-end;

  input {
    border: 1px solid #DADADA;
    border-radius: 4px;
    font-size: 16px;
    height: 48px;
    padding: 0 12px;

    &:first-of-type {
      border-bottom-right-radius: 0;
      border-top-right-radius: 0;
    }

    &:last-of-type {
      border-bottom-left-radius: 0;
      border-top-left-radius: 0;
      border-left-width: 0;
    }
  }

  ${Button} {
    margin-left: 12px;
  }
`;

const Reviews = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const Review = styled.li`
  & + li {
    margin-top: 16px;
  }

  h5 {
    font-size: 16px;
    margin: 0;
  }

  p {
    margin-top: 8px;
  }
`;

export const HotelDetails = ({ hotel, loading, placeReservation }) => {
  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const payload = { hotelId: hotel.id };
    for (const key of formData.keys()) {
      payload[key] = formData.get(key);
    }

    placeReservation(payload);
  };

  return (
    <div>
      <Switch>
        <Case condition={loading} render={() => <Loading className="illustration" />} />
        <Case condition={!hotel} render={() => null} />
        <Case
          default
          render={() => (
            <Checkout>
              <div className="pictures">
                {hotel.pictures.map((pic, index) => (
                  <img src={pic} key={pic} alt={`hotel-picture-${index + 1}`} />
                ))}
              </div>
              <Content>
                <h2>{hotel.name}</h2>
                <p>{hotel.address} | {hotel.city}, {hotel.state} - {hotel.zipcode}</p>
                <p className="full-description">{hotel.description}</p>
                <Actions onSubmit={handleSubmit}>
                  <input name="startDate" type="date" defaultValue="2021-02-12" />
                  <input name="endDate" type="date" defaultValue="2021-02-14" />
                  <Button>
                    Place reservation
                  </Button>
                </Actions>
                <hr style={{ margin: '24px 0' }} />
                <Reviews>
                  {hotel.reviews.map((review) => (
                    <Review key={review.id}>
                      <h5>{review.user.firstName} {review.user.lastName} ({review.rating})</h5>
                      <p>{review.comments}</p>
                    </Review>
                  ))}
                </Reviews>
              </Content>
            </Checkout>
          )}
        />
      </Switch>
    </div>
  );
};

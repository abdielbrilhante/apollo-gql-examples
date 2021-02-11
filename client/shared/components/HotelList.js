import * as React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

import { Switch, Case } from '../utils/Switch';
import Loading from '../assets/Loading.svg';
import NoDataIllustration from '../assets/NoDataIllustration.svg';
import Search from '../assets/Search.svg';
import Star from '../assets/Star.svg';

// FIXME: styles are a bit of a mess

const ListContainer = styled.ul`
  display: flex;
  flex-wrap: wrap;
  margin: 24px 0 0;
  padding: 0;
`;

const ListItem = styled.li`
  background-color: white;
  border: 2px solid white;
  border-radius: 12px;
  box-shadow: 0 12px 36px -12px rgba(0, 30, 60, 0.25);
  cursor: pointer;
  list-style: none;
  margin-bottom: 24px;
  position: relative;
  overflow: hidden;
  width: calc((100% / 3) - 16px);

  transition: border-color 200ms ease-in-out;

  &:hover {
    border-color: #28536B;
  }

  &:nth-child(3n) {
    margin-left: 12px;
  }

  &:nth-child(3n + 2) {
    margin-left: 12px;
    margin-right: 12px;
  }

  &:nth-child(3n + 1) {
    margin-right: 12px;
  }

  .img-container {
    padding: 8px 8px 0;
    position: relative;

    img {
      border-radius: 8px;
      display: block;
      filter: grayscale(0.5);
      height: 200px;
      width: 100%;
      object-fit: cover;
    }
  }


  .description {
    padding: 8px 8px 42px;

    h3 {
      font-size: 16px;
      margin: 0 0 4px;
    }

    p {
      font-size: 14px;
      margin: 0%;
    }
  }

  .rating {
    bottom: 8px;
    left: 8px;
    position: absolute;

    svg {
      height: 14px;
      width: 14px;

      & + svg {
        margin-left: 2px;
      }

      path {
        fill: #B0B2B4;
      }

      &.active {
        path {
          fill: palegoldenrod;
        }
      }
    }
  }
`;

const maxStars = Array(5).fill(null);

export const HotelList = ({ items, loading }) => {
  const navigate = useNavigate();
  return (
    <div>
      <Switch>
        <Case condition={loading} render={() => <Loading className="illustration" />} />
        <Case condition={!items} render={() => <Search className="illustration" />} />
        <Case condition={!items?.length} render={() => <NoDataIllustration className="illustration" />} />
        <Case
          default
          render={() => (
            <ListContainer>
              {items.map((item) => (
                <ListItem key={item.id} onClick={() => navigate(`/hotels/${item.id}`)}>
                  <div className="img-container">
                    <img src={item.thumbnail} alt={item.name} />
                  </div>
                  <div className="description">
                    <h3>{item.name} - {item.starRating} stars</h3>
                    <p>{item.address}</p>
                    <p>{item.city}, {item.state} - {item.zipcode}</p>
                  </div>
                  <div className="rating">
                    {maxStars.map((_, index) => (
                      <Star
                        key={index}
                        className={item.averageRating > index ? 'active' : ''}
                      />
                    ))}
                  </div>
                </ListItem>
              ))}
            </ListContainer>
          )}
        />
      </Switch>
    </div>
  );
};

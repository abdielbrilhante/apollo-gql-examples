import * as React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Header = styled.header`
  background-color: white;
  box-shadow: 0 2px 6px -2px rgba(0, 30, 60, 0.15);
  height: 60px;
  padding: 0 24px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  h1 a {
    color: #28536B;
    display: block;
    font-size: 22px;
    text-decoration: none
  }
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  font-weight: 500;

  img {
    border-radius: 50%;
    height: 40px;
    margin-left: 16px;
    width: 40px;
  }
`;

export const TopBar = ({ account }) => (
  <Header>
    <h1><Link to="/">Reactotel</Link></h1>
    {account && (
      <UserInfo>
        <div>
          Hello, {account.firstName} {account.lastName}
        </div>
        <img src={account.profilePicture} alt="profile-picture"/>
      </UserInfo>
    )}
  </Header>
);

import React from 'react';
import Header from '../components/Header';
// import { BrowserRouter, Route } from 'react-router-dom';

class Profile extends React.Component {
  render() {
    return (
      <div data-testid="page-profile">
        <Header />

        <p>page-profile</p>
      </div>
    );
  }
}

export default Profile;

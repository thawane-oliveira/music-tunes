import React from 'react';
import Header from '../components/Header';
// import { BrowserRouter, Route } from 'react-router-dom';

class Favorites extends React.Component {
  render() {
    return (
      <div data-testid="page-favorites">
        <Header />
        <p>page-favorites</p>
      </div>
    );
  }
}

export default Favorites;

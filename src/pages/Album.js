import React from 'react';
import Header from '../components/Header';
// import { BrowserRouter, Route } from 'react-router-dom';

class Album extends React.Component {
  render() {
    return (
      <div data-testid="page-album">
        <Header />

        <p>page-album</p>
      </div>
    );
  }
}

export default Album;

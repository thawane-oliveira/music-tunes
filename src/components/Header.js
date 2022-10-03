import React from 'react';
import NowLoading from '../pages/NowLoading';
import { getUser } from '../services/userAPI';
// import { BrowserRouter, Route } from 'react-router-dom';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      userName: '',
    };
  }

  componentDidMount() {
    this.searchUser();
  }

  searchUser = async () => {
    const dbName = await getUser();
    this.setState({ isLoading: false, userName: dbName });
  };

  render() {
    const { isLoading, userName } = this.state;
    return (
      <header data-testid="header-component">
        {isLoading && <NowLoading />}
        {!isLoading && <div data-testid="header-user-name">{ userName.name }</div>}
      </header>
    );
  }
}

export default Header;

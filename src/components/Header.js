import React from 'react';
import { Link } from 'react-router-dom';
import NowLoading from '../pages/NowLoading';
import { getUser } from '../services/userAPI';

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
        <div>
          <Link to="/search" data-testid="link-to-search">
            <button type="button">Pesquisar</button>
          </Link>
        </div>
        <div>
          <Link to="/favorites" data-testid="link-to-favorites">
            <button type="button">Favoritos</button>
          </Link>
        </div>
        <div>
          <Link to="/profile" data-testid="link-to-profile">
            <button type="button">Perfil</button>
          </Link>
        </div>
        {isLoading && <NowLoading />}
        {!isLoading && <div data-testid="header-user-name">{ userName.name }</div>}
      </header>
    );
  }
}

export default Header;

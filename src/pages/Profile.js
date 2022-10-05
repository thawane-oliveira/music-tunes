import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';
import NowLoading from './NowLoading';
// import { BrowserRouter, Route } from 'react-router-dom';

class Profile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loginName: '',
      isLoading: true,
    };
  }

  async componentDidMount() {
    const loginName = await getUser();
    this.setState({ isLoading: false, loginName });
  }

  render() {
    const { isLoading, loginName } = this.state;
    return (
      <div data-testid="page-profile">
        <Header />
        { isLoading ? <NowLoading />
          : (
            <>
              <Link to="/profile/edit">
                Editar perfil

              </Link>
              <img
                src={ loginName.image }
                alt={ loginName.name }
                data-testid="profile-image"
              />
              <p>{loginName.name}</p>
              <p>{loginName.email}</p>
              <p>{loginName.description}</p>
            </>
          )}
      </div>
    );
  }
}

export default Profile;

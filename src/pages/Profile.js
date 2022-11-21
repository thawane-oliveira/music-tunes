import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';
import '../styles/Profile.css';
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
            <div className="profile-container">
              <img
                className="profile-img"
                src={ loginName.image }
                alt={ loginName.name }
                data-testid="profile-image"
              />
              <p className="profile-name">{loginName.name}</p>
              <p className="profile-email">{loginName.email}</p>
              <p className="profile-desc">{loginName.description}</p>
              <Link to="/profile/edit">
                <button className="edit-button" type="button">Editar perfil</button>

              </Link>
            </div>
          )}
      </div>
    );
  }
}

export default Profile;

import PropTypes from 'prop-types';
import React from 'react';
// import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import { getUser, updateUser } from '../services/userAPI';
import NowLoading from './NowLoading';
// import { BrowserRouter, Route } from 'react-router-dom';

class ProfileEdit extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
      image: '',
      description: '',
      // nomes acima de acordo com objeto que a função updateUser espera receber, de acordo com requisito 14 do readme
      isLoading: true,
      isDisabled: true,
      // redirect: false,
    };
  }

  async componentDidMount() {
    this.setState({ isLoading: true });
    const userInfo = await getUser();
    const { name, email, image, description } = userInfo;
    this.setState({ isLoading: false, name, email, image, description });
  }

  onInputChange = (evt) => {
    const { name, value } = evt.target;
    this.setState({ [name]: value }, this.enableSaveButton);
  };

  sendChangedInfo = async () => {
    const { name, email, image, description } = this.state;
    this.setState({ isLoading: true });
    await updateUser({ name, email, image, description });
    this.redirectUser();
    this.setState({ isLoading: false });
  };

  redirectUser = () => {
    const { history } = this.props;
    history.push('/profile');
  };

  enableSaveButton() {
    const { name, email, image, description } = this.state;

    // const minLength = 0;

    const verifyEachInput = name.length > 0
    && email.length > 0
    && description.length > 0
    && image.length > 0;

    const condition = /^\S+@\S+\.\S+$/;
    const verifyEmailRegex = email.match(condition);

    if (verifyEachInput && verifyEmailRegex) {
      this.setState({ isDisabled: false });
    } else {
      this.setState({ isDisabled: true });
    }
  }

  render() {
    const { isDisabled, isLoading,
      name, email, image, description } = this.state;

    return (
      <div data-testid="page-profile-edit">
        <Header />

        { isLoading ? <NowLoading />
          : (
            <fieldset>
              <label htmlFor="name">
                Alterar nome de usuário
                <input
                  data-testid="edit-input-name"
                  type="text"
                  name="name"
                  value={ name }
                  onChange={ this.onInputChange }
                />
              </label>
              <label htmlFor="email">
                Alterar e-mail
                <input
                  data-testid="edit-input-email"
                  type="text"
                  name="email"
                  value={ email }
                  onChange={ this.onInputChange }
                />
              </label>
              <label htmlFor="description">
                Alterar descrição
                <input
                  data-testid="edit-input-description"
                  type="textArea"
                  name="description"
                  value={ description }
                  onChange={ this.onInputChange }
                />
              </label>
              <label htmlFor="image">
                Alterar foto de perfil
                <input
                  data-testid="edit-input-image"
                  type="text"
                  name="image"
                  value={ image }
                  onChange={ this.onInputChange }
                />
              </label>
              <div>
                <button
                  type="button"
                  data-testid="edit-button-save"
                  disabled={ isDisabled }
                  onClick={ this.sendChangedInfo }
                >
                  Editar perfil
                </button>
                {/* {redirect && <Redirect to="/profile" />} */}
              </div>
            </fieldset>
          )}
      </div>
    );
  }
}

ProfileEdit.propTypes = {
  history: PropTypes.object,
}.isRequired;

export default ProfileEdit;

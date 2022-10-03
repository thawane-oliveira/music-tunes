import React from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import NowLoading from './NowLoading';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loginName: '',
      isButtonDisabled: true,
      isLoading: true,
      redirect: false,
    };
  }

  enableSubmitButton = () => {
    const { loginName } = this.state;
    const minLength = 3;
    if (loginName.length >= minLength) {
      this.setState({ isButtonDisabled: false });
    } else {
      this.setState({ isButtonDisabled: true });
    }
  };

  onInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value }, this.enableSubmitButton);
  };

  onButtonClick = async () => {
    const { loginName } = this.state;
    // const { history } = this.props;
    this.setState({ isLoading: false });
    await createUser({ name: loginName });
    this.setState({ isLoading: true, redirect: true });
  };

  render() {
    const { loginName, isButtonDisabled, isLoading, redirect } = this.state;

    return (
      <div data-testid="page-login">
        <fieldset>
          <label htmlFor="login-name-input">
            <input
              type="text"
              data-testid="login-name-input"
              name="loginName"
              id="login-name-input"
              value={ loginName }
              onChange={ this.onInputChange }
            />
          </label>
          <button
            type="button"
            data-testid="login-submit-button"
            disabled={ isButtonDisabled }
            onClick={ this.onButtonClick }
          >
            Entrar
          </button>
          {!isLoading && <NowLoading />}
          {redirect && <Redirect to="/search" />}
        </fieldset>
      </div>
    );
  }
}

export default Login;

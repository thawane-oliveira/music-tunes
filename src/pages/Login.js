import React from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import '../styles/Login.css';
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
      <div data-testid="page-login" className="login-container">
        <div className="container-title">
          <h1 className="login-title">trybetunes</h1>
        </div>

        <fieldset className="fieldset-container">
          <label htmlFor="login-name-input" className="login-label">
            Insira aqui o seu nome de usuário:
            <input
              className="login-input"
              type="text"
              data-testid="login-name-input"
              name="loginName"
              id="login-name-input"
              placeholder="Exemplo: chicharro"
              value={ loginName }
              onChange={ this.onInputChange }
            />
          </label>
          <button
            className="login-button"
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

import React from 'react';
import Header from '../components/Header';
// import { BrowserRouter, Route } from 'react-router-dom';

class Search extends React.Component {
  constructor() {
    super();

    this.state = {
      searchInput: '',
      isButtonDisabled: true,
    };
  }

  enableSearchButton = () => {
    const { searchInput } = this.state;
    const minLength = 2;
    if (searchInput.length >= minLength) {
      this.setState({ isButtonDisabled: false });
    } else {
      this.setState({ isButtonDisabled: true });
    }
  };

  onInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value }, this.enableSearchButton);
  };

  render() {
    const { searchInput, isButtonDisabled } = this.state;
    return (
      <div data-testid="page-search">
        <Header />

        <fieldset>

          <label htmlFor="searchInput">
            <input
              type="text"
              data-testid="search-artist-input"
              name="searchInput"
              id="searchInput"
              value={ searchInput }
              onChange={ this.onInputChange }
            />
          </label>
          <button
            type="button"
            data-testid="search-artist-button"
            disabled={ isButtonDisabled }
          >
            Entrar
          </button>

        </fieldset>
      </div>
    );
  }
}

export default Search;

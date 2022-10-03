import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import NowLoading from './NowLoading';

class Search extends React.Component {
  constructor() {
    super();

    this.state = {
      displayResult: false,
      isButtonDisabled: true,
      isLoading: false,
      searchValue: '',
      research: '',
      searchResult: '',
    };
  }

  enableSearchButton = () => {
    const { searchValue } = this.state;
    const minLength = 2;
    if (searchValue.length >= minLength) {
      this.setState({ isButtonDisabled: false });
    } else {
      this.setState({ isButtonDisabled: true });
    }
  };

  onInputChange = (event) => {
    const { value } = event.target;
    this.setState({ searchValue: value }, this.enableSearchButton);
  };

  onButtonClick = async () => {
    const { searchValue } = this.state;
    this.setState({ isLoading: true, research: searchValue });
    const apiResponse = await searchAlbumsAPI(searchValue);
    // console.log(typeof searchInput);
    this.setState({
      isLoading: false,
      searchValue: '',
      searchResult: apiResponse,
      displayResult: true,
    }, this.enableSearchButton);
  };

  render() {
    const {
      searchValue, research, isButtonDisabled, isLoading, searchResult, displayResult,
    } = this.state;
    return (
      <div data-testid="page-search">
        <Header />

        {isLoading ? <NowLoading />

          : (
            <fieldset>

              <label htmlFor="searchValue">
                <input
                  type="text"
                  data-testid="search-artist-input"
                  name="searchValue"
                  id="searchValue"
                  value={ searchValue }
                  onChange={ this.onInputChange }
                />
              </label>
              <button
                type="button"
                data-testid="search-artist-button"
                disabled={ isButtonDisabled }
                onClick={ this.onButtonClick }
              >
                Pesquisar
              </button>

            </fieldset>
          )}
        { displayResult && (
          <>
            <span>
              {`Resultado de álbuns de:
              ${research}`}
            </span>
            {
              searchResult.length === 0
                ? <span> Nenhum álbum foi encontrado</span>
                : searchResult.map((item, id) => (
                  <div key={ id }>
                    <p>{item.artistName}</p>
                    <p>{item.collectionName}</p>
                    <img src={ item.artworkUrl100 } alt={ item.artistName } />

                    <Link
                      to={ `/album/${item.collectionId}` }
                      data-testid={ `link-to-album-${item.collectionId}` }
                    >
                      <p>Ir para a página do álbum</p>
                    </Link>

                  </div>
                ))
            }
          </>
        )}
      </div>
    );
  }
}

export default Search;

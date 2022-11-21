import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import '../styles/Search.css';
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
            <fieldset className="search-container">
              <h3 className="search-title">Insira aqui sua pesquisa:</h3>

              <label htmlFor="searchValue" className="search-label">
                <input
                  className="search-input"
                  type="text"
                  data-testid="search-artist-input"
                  name="searchValue"
                  id="searchValue"
                  placeholder="Exemplo: SNSD"
                  value={ searchValue }
                  onChange={ this.onInputChange }
                />
              </label>
              <button
                type="button"
                className="field-search-button"
                data-testid="search-artist-button"
                disabled={ isButtonDisabled }
                onClick={ this.onButtonClick }
              >
                Pesquisar
              </button>

            </fieldset>
          )}
        { displayResult && (
          <div className="divzona">
            <p className="result-title">
              {`Resultado de álbuns de: ${research}`}
            </p>
            <div className="result-container">
              {
                searchResult.length === 0
                  ? <span className="result-title"> Nenhum álbum foi encontrado</span>
                  : searchResult.map((item, artistId) => (
                    <div key={ artistId } className="result-album">
                      <p className="result-name">{item.artistName}</p>
                      <p className="result-albumname">{item.collectionName}</p>
                      <img src={ item.artworkUrl100 } alt={ item.artistName } />

                      <Link
                        to={ `/album/${item.collectionId}` }
                        data-testid={ `link-to-album-${item.collectionId}` }
                      >
                        <p className="result-link">Ir para a página do álbum</p>
                      </Link>

                    </div>
                  ))
              }
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Search;

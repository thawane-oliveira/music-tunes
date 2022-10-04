import PropTypes from 'prop-types';
import React from 'react';
import { addSong } from '../services/favoriteSongsAPI';
import NowLoading from './NowLoading';

class MusicCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      // favMusic: false,
    };
  }

  addFavMusic = async (music) => {
    // if (checked) { this.setState({ favMusic: true }); } else {
    //   this.setState({ favMusic: false });
    // }
    this.setState({ isLoading: true });
    await addSong(music);
    this.setState({ isLoading: false });
  };

  render() {
    const { musics } = this.props;
    const { isLoading } = this.state;

    return (
      <main>
        { isLoading ? <NowLoading />
          : (
            musics.map((music) => (
              <div key={ music.trackName }>
                <p>{music.trackName}</p>
                <img src={ music.artworkUrl100 } alt={ music.trackName } />
                <audio data-testid="audio-component" src={ music.previewUrl } controls>
                  <track kind="captions" />
                  O seu navegador não suporta o elemento
                  <code>audio</code>
                  .
                </audio>
                <label
                  data-testid={ `checkbox-music-${music.trackId}` }
                  htmlFor="favorite"
                >
                  Favorita
                  <input
                    type="checkbox"
                    name="favorite"
                    id="favorite"
                    onClick={ () => this.addFavMusic(music) }
                  />
                </label>
              </div>
            ))
          )}

      </main>
    );
  }
}

MusicCard.propTypes = {
  musics: PropTypes.arrayOf(PropTypes.shape({
    trackName: PropTypes.string.isRequired,
    previewUrl: PropTypes.string.isRequired,
  })).isRequired,
};

export default MusicCard;

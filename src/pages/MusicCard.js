import PropTypes from 'prop-types';
import React from 'react';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import '../styles/MusicCard.css';
import NowLoading from './NowLoading';

class MusicCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      checked: false,
    };
  }

  async componentDidMount() {
    const { music } = this.props;
    this.setState({ isLoading: true });
    const favoriteSongs = await getFavoriteSongs();
    const isMusicFavorite = favoriteSongs.find((song) => song.trackId === music.trackId);
    if (isMusicFavorite) {
      this.setState({ checked: true });
    }
    this.setState({ isLoading: false });
  }

  addFavMusic = async (music, e) => {
    const { setFavoriteSongs } = this.props;
    const { checked } = e.target;
    this.setState({ isLoading: true, checked });
    if (checked) {
      await addSong(music);
    } else {
      await removeSong(music);
    }

    await setFavoriteSongs();
    this.setState({ isLoading: false });
  };

  render() {
    const { isLoading, checked } = this.state;
    const { music } = this.props;
    return (
      <main>
        { isLoading ? <NowLoading />
          : (
            <div className="musicplayer-container" key={ music.trackId }>
              <p className="music-name">{music.trackName}</p>
              {/* {console.log(music.trackName)} */}
              <img src={ music.artworkUrl100 } alt={ music.trackName } />
              <audio
                className="audio-player"
                data-testid="audio-component"
                src={ music.previewUrl }
                controls
              >
                <track kind="captions" />
                O seu navegador não suporta o elemento
                <code>audio</code>
                .
              </audio>
              <label
                data-testid={ `checkbox-music-${music.trackId}` }
                htmlFor={ music.trackId }
                className="fav-label"
              >
                Favorita
                <input
                  className="checkbox"
                  type="checkbox"
                  name={ music.trackId }
                  id={ music.trackId }
                  checked={ checked }
                  onChange={ (e) => this.addFavMusic(music, e) }
                />
              </label>
            </div>
          )}
      </main>
    );
  }
}

MusicCard.propTypes = {
  setFavoriteSongs: PropTypes.func.isRequired,
  music: PropTypes.shape({
    trackId: PropTypes.number.isRequired,
    artworkUrl100: PropTypes.string,
    trackName: PropTypes.string.isRequired,
    previewUrl: PropTypes.string.isRequired,
  }).isRequired,
};

export default MusicCard;

import PropTypes from 'prop-types';
import React from 'react';
import { addSong } from '../services/favoriteSongsAPI';
import NowLoading from './NowLoading';

class MusicCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
    };
  }

  componentDidMount() {
    const { musics } = this.props;
    const checkedMusic = musics.map((music) => ({ ...music, checked: false }));
    this.setState({ musicList: checkedMusic, isLoading: false });
  }

  addFavMusic = async (music, e) => {
    const { name } = e.target;
    const { musicList } = this.state;
    this.setState({ isLoading: true });
    await addSong(music);

    const clickedMusic = musicList.map((item) => {
      if (Number(name) === item.trackId) {
        return { ...item, checked: !item.checked };
      }
      return item;
    });

    this.setState({ musicList: clickedMusic, isLoading: false });
  };

  render() {
    const { isLoading, musicList } = this.state;
    return (
      <main>
        { isLoading ? <NowLoading />
          : (
            musicList.map((music) => (
              <div key={ music.trackId }>
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
                  htmlFor={ music.trackId }
                >
                  Favorita
                  <input
                    type="checkbox"
                    name={ music.trackId }
                    id={ music.trackId }
                    checked={ music.checked }
                    onChange={ (e) => this.addFavMusic(music, e) }
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

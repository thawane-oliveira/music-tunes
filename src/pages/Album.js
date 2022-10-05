import PropTypes from 'prop-types';
import React from 'react';
import Header from '../components/Header';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import getMusics from '../services/musicsAPI';
import MusicCard from './MusicCard';
import NowLoading from './NowLoading';
// import { BrowserRouter, Route } from 'react-router-dom';

class Album extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      playlist: '',
      isLoading: true,
      // favoriteArray: [],
      // id: this.props.match.params.id,
    };
  }

  componentDidMount() {
    this.fetchMusic();
  }

  fetchMusic = async () => {
    const { match: { params: { id } } } = this.props;
    const musics = await getMusics(id);
    const cuttedProps = [...musics];
    cuttedProps.shift();
    this.setState({ musics: cuttedProps, playlist: musics, isLoading: false });
  };

  setFavoriteSongs = async () => {
    await getFavoriteSongs();
    // this.setState({ favoriteArray: getLocalSong });
  };

  render() {
    const { playlist, isLoading, musics } = this.state;
    return (
      <div data-testid="page-album">
        <Header />

        {isLoading
          ? <NowLoading />
          : (
            <div>
              <p data-testid="artist-name">{playlist[0].artistName}</p>
              <p data-testid="album-name">{playlist[0].collectionName}</p>
              {musics.map((item) => (
                <MusicCard
                  key={ item.trackId }
                  music={ item }
                  setFavoriteSongs={ this.setFavoriteSongs }
                />
              ))}
            </div>)}
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,

};

export default Album;

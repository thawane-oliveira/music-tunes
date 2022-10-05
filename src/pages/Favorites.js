import React from 'react';
import Header from '../components/Header';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import MusicCard from './MusicCard';
import NowLoading from './NowLoading';
// import { BrowserRouter, Route } from 'react-router-dom';

class Favorites extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      favoriteArray: [],
    };
  }

  async componentDidMount() {
    this.setState({ isLoading: true });
    const getLocalSong = await getFavoriteSongs();
    this.setState({ isLoading: false, favoriteArray: getLocalSong });

    // // this.setState({ isLoading: true });
    // const removeFav = await removeSong();
    // console.log(removeFav);
    // this.setState({ isLoading: false, favoriteArray: removeFav });
  }

  setFavoriteSongs = async () => {
    const getLocalSong = await getFavoriteSongs();
    this.setState({ favoriteArray: getLocalSong });
  };

  render() {
    const { isLoading, favoriteArray } = this.state;
    return (
      <div data-testid="page-favorites">
        <Header />
        {isLoading ? <NowLoading /> : (
          favoriteArray.map((msc) => (
            console.log(msc, typeof msc.trackId)
            || <MusicCard
              key={ msc.trackId }
              music={ msc }
              setFavoriteSongs={ this.setFavoriteSongs }
            />
          ))
        )}
      </div>
    );
  }
}

export default Favorites;

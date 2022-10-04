import React from 'react';
// import { BrowserRouter, Route } from 'react-router-dom';

class MusicCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      musics: [],
    };
  }

  componentDidMount() {
    const { playlist } = this.props;
    const { musics } = this.state;
    const cuttedProps = [...playlist];
    cuttedProps.shift();
    this.setState({ musics: cuttedProps });
  }

  render() {
    // const { playlist } = this.props;
    const { musics } = this.state;
    return (
      <div>
        { musics.map(({ trackName, previewUrl }) => (
          <div key={ trackName }>
            <p>{trackName}</p>
            <audio data-testid="audio-component" src={ previewUrl } controls>
              <track kind="captions" />
              O seu navegador não suporta o elemento
              <code>audio</code>
              .
            </audio>
          </div>
        ))}
      </div>
    );
  }
}

export default MusicCard;

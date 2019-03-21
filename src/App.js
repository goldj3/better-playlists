import React, { Component } from 'react';
import './App.css';

let defaultStyle = {
  color: '#fff'
};

let fakeServerData = {
  user: {
    name: 'Justin',
    playlists: [
      {
        name: 'My favorites',
        songs: [{name: 'The City', duration: 155}, 
                {name: 'Peaches', duration: 213}, 
                {name: 'Trampoline', duration: 93}]
      },
      {
        name: 'Dance',
        songs: [{name: 'Dancing Queen', duration: 99}, 
                {name: 'Fun Times', duration: 180}, 
                {name: 'Some Nights', duration: 33}]
      },
      {
        name: 'Best Playlist',
        songs: [{name: 'Ooh La La', duration: 83}, 
        {name: 'Rugrats', duration: 93}, 
        {name: 'Orange Rain', duration: 45}]
      },
      {
        name: 'Rock',
        songs: [{name: 'Show Me the Way', duration: 834}, 
                {name: 'Night Moves', duration: 932}, 
                {name: 'Rude', duration: 453}]
      }
    ]
  }
}

class PlaylistCounter extends Component {
    render() {
      return (
          <div style={{...defaultStyle, width: "40%", display: 'inline-block'}}>
            <h2>{this.props.playlists.length} playlists </h2>
          </div>
      );
    }
}

class HoursCounter extends Component {
  render() {
    let allSongs = this.props.playlists.reduce((songs, eachPlaylist) => {
        return songs.concat(eachPlaylist.songs)
    }, []);
    let totalDuration = allSongs.reduce((sum, eachSong) => {
        return sum + eachSong.duration
    }, 0)
    return (
        <div style={{...defaultStyle, width: "40%", display: 'inline-block'}}>
          <h2>{Math.round(totalDuration/60)} hours </h2>
        </div>
    );
  }
}

class Filter extends Component {
    render() {
        return (
          <div style={defaultStyle}>
            <img/>
            <input type="text" onKeyUp={event => 
              this.props.onTextChange(event.target.value)}/>
          </div>
        );

    }
}

class Playlist extends Component {
    render() {
      let playlist = this.props.playlist;
      return(
        <div style={{...defaultStyle, display: 'inline-block', width: "25%"}}>
          <img />
          <h3>{playlist.name}</h3>
          <ul>
            {playlist.songs.map(song => 
              <li>{song.name}</li>
            )}
          </ul>
        </div>

      );
    }

}

class App extends Component {
  constructor(){
    super();
    this.state = {
      serverData: {},
      filterString: ''
    }
  }
  componentDidMount() {
    setTimeout(() => {
      this.setState({serverData: fakeServerData});
    }, 1000);
  }
  render() {

    return (
      <div className="App">
        {this.state.serverData.user ? 
        <div>
          <h1 style = {{...defaultStyle, 'font-size': '54px'}}>
            {this.state.serverData.user.name}'s Playlists
          </h1>
          <PlaylistCounter playlists= {this.state.serverData.user.playlists}/>
          <HoursCounter playlists= {this.state.serverData.user.playlists}/> 
          <Filter onTextChange={text => {
              this.setState({filterString: text})
              }}/>
          {this.state.serverData.user.playlists.filter(playlist =>
            playlist.name.toLowerCase().includes(
              this.state.filterString.toLowerCase())
          ).map(playList =>
            <Playlist playlist={playList}/>
            )}
        </div> : <h1 style={{...defaultStyle, fontSize: '20px'}}>Loading...</h1>
        }
    </div>
    );
  }
}

export default App;

import React, { Component } from 'react';
import Navbar from '../components/navbar/Navbar';
import Header from '../components/header/Header';
// import BootRoom from '../components/boot-room/BootRoom';
import SongsSection from '../components/songs-section/SongsSection';
import SubmissionsSection from '../components/submissions-section/SubmissionsSection';
import './App.css';

class App extends Component {

  constructor() {
    super();
    this.state = {
      songs: {},
      suggestedSongs: {},
      latestSuggestedSong: {},
      latestVideo: {}
    };
  }

  setSongs = (songs, suggestedSongs, latestSuggestedSong, latestVideo) => {
    this.setState({
      songs: songs,
      suggestedSongs: suggestedSongs,
      latestSuggestedSong: latestSuggestedSong,
      latestVideo: latestVideo
    });
  }

  render() {
    return (
    	<div>
      		<Navbar />
      		<Header />
          {/*
      		<BootRoom latestSuggestedSong={this.state.latestSuggestedSong} latestVideo={this.state.latestVideo}/>
      		*/}
          <SongsSection onDataLoad={this.setSongs} />
      		<SubmissionsSection />
      	</div>
    );
  }
}

export default App;

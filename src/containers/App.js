import React, { Component } from 'react';
import Navbar from '../components/navbar/Navbar';
import Header from '../components/header/Header';
import BootRoom from '../components/boot-room/BootRoom';
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
    }
  }

  componentDidMount() {
    fetch('http://localhost:3000/data')
      .then(response => response.json() )
      .then(data => {
        this.setState = ({
          songs: data[0],
          suggestedSongs: data[1],
          latestSuggestedSong: this.state.suggestedSongs[data[2]],
          latestVideo: data[3]
        });
      });
      // .then(result => {
      //   console.log(`Songs:`);
      //   console.log(this.state.songs);
      //   console.log(`Suggested songs:`);
      //   console.log(this.state.suggestedSongs);
      //   console.log(`Latest suggested song:`);
      //   console.log(this.state.latestSuggestedSong);
      //   console.log(`Latest video:`);
      //   console.log(this.state.latestVideo);
      // });
  }

  render() {
    return (
    	<div>
      		<Navbar />
      		<Header />
      		<BootRoom />
      		<SongsSection />
      		<SubmissionsSection />
      	</div>
    );
  }
}

export default App;

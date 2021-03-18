import React, { Component } from 'react';
import Section from '../section/Section';
import './SongSection.css';

import SongList from './components/song-list/SongList';
import SearchBox from './components/search-box/SearchBox';
import NavCategory from './components/nav-category/NavCategory';

class SongsSection extends Component {

	constructor(props) {
		super(props);
		this.state = {
			display: 'general',
			lastShownCategory: 'general',
			searchResult: [],
		}
	}

	componentDidMount() {
    fetch('https://kop-stop-api.herokuapp.com/data')
      .then(response => response.json() )
      .then(data => {
      	if(data[3].id) {
        	data[3].tags = data[0][data[3].song_id].tags;
        	data[3].songName = data[0][data[3].song_id].title;
    	}
        let suggestedSongs = [];
        for (const song in data[1]) {
        	data[1][song].tags.unshift(['Suggested song','suggested songs']);
        	suggestedSongs.unshift(data[1][song]);
        }
        this.setState({
        	songs: {
				all: data[0],
				'suggested songs': suggestedSongs
			}
		});
        this.props.onDataLoad(data[0], data[1], data[1][data[2]], data[3]);
        this.loadGeneralSongs();
      })
      .then(result => {
      	this.loadCategorySongs('current players');
      	this.loadCategorySongs('former players');
      	this.loadCategorySongs('managers');
      	this.loadCategorySongs('rival clubs');
      	this.loadCategorySongs('rival players');
      	this.loadCategorySongs('rival managers');
      })
      .catch(error => console.log(error));
  	}

  	loadGeneralSongs = () => {
  		const { songs } = this.state;
  		let generalSongs = [];
  		for (let song in songs['all']) {
			if (songs['all'].hasOwnProperty(song) && songs['all'][song].tags[0][1] === 'general') {
				song = songs['all'][song];
				generalSongs.push(song);
			}
		}
		generalSongs.sort(this.sortSongArray);
		let updatedSongs = Object.assign({}, songs);
		updatedSongs['general'] = generalSongs;
		this.setState({
			songs: updatedSongs
		});
  	}

  	loadCategorySongs = category => {
  		const { songs } = this.state;
  		let categorySongs = {};
  		for (let song in songs['all']) {
  			if (songs['all'].hasOwnProperty(song) && songs['all'][song].tags[0][1] === category) {
  				song = songs['all'][song];
  				if(categorySongs[song.tags[0][0]]) {
  					categorySongs[song.tags[0][0]].push(song);
  				} else {
  					categorySongs[song.tags[0][0]] = [song];
  				}
  			}
  		}
  		for (const subject in categorySongs) {
  			if(categorySongs.hasOwnProperty(subject)) {
  				categorySongs[subject].sort(this.sortSongArray);
  			}
  		}
  		let updatedSongs = Object.assign({}, songs);
		updatedSongs[category] = categorySongs;
		this.setState({
			songs: updatedSongs
		});
  	}

  	sortSongArray = (a, b) => {
  		return a.title.toLowerCase().localeCompare(b.title.toLowerCase());
  	}

  	switchCategory = category => {
  		this.setState(state => ({
  			display: category,
  			lastShownCategory: category,
  			searchResult: []
  		}));
  	}

  	onSearchChange = (event) => {
  		if (event.target.value !== '') {
			this.setState({
				display: 'search',
				searchResult: this.searchSongs(event.target.value),
			});
		} else {
			this.setState({
				display: this.state.lastShownCategory,
				searchResult: [],
			});
		}
	}

	toNormalisedLowerCase = string => {
		return string.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "");
	}

	searchSongs = searchTerm => {
		if(searchTerm && this.state.songs) {
			searchTerm = this.toNormalisedLowerCase(searchTerm);
			const { all } = this.state.songs;
			let matchingSongs = [];
			for(const song in all) {
				if(this.toNormalisedLowerCase(all[song].title).includes(searchTerm) || all[song].tags.filter(tag => this.toNormalisedLowerCase(tag[0]).includes(searchTerm)).length ) {
					matchingSongs.push(all[song]);
				}
			}
			return matchingSongs.sort(this.sortSongArray);
		} else {
			return [];
		}
	}

	render() {
		const { songs, display } = this.state;
		let displayedSongs;
		if(songs) {
			if(songs[display]) {
				displayedSongs = songs[display];
			} else if(display === 'search') {
				displayedSongs = this.state.searchResult;
			}
		}
		return (
			<Section id="songs-section" title="Songs" titleColour="black" backgroundColour="red">
				<div id="nav-categories">
					<NavCategory name="General" currentCategory={display} switchCategory={this.switchCategory} />
					<NavCategory name="Current players" currentCategory={display} switchCategory={this.switchCategory} />
					<NavCategory name="Former players" currentCategory={display} switchCategory={this.switchCategory} />
					<NavCategory name="Managers" currentCategory={display} switchCategory={this.switchCategory} />
					<NavCategory name="Rival clubs" currentCategory={display} switchCategory={this.switchCategory} />
					<NavCategory name="Rival players" currentCategory={display} switchCategory={this.switchCategory} />
					<NavCategory name="Rival managers" currentCategory={display} switchCategory={this.switchCategory} />
					<NavCategory name="Suggested songs" currentCategory={display} switchCategory={this.switchCategory} />
				</div>
				<SearchBox searchChange={this.onSearchChange} />
				<p id="instruction">Click a song to view it</p>
				{!songs && <p id="loading-message">Loading songs...</p>}
				{displayedSongs && <SongList songs={displayedSongs} width='80%'/>}
				{(songs && display === 'search' && !displayedSongs.length) && <p id="no-search-results-message">Sorry, we couldn't find any matching songs.  Try being less specific with your input; you can search by song title or for a particular player, manager or club.  Otherwise, if you know a song we don't, let us know about it by emailing <a href="mailto:hello@kopstop.co.uk?subject=Submission">hello@kopstop.co.uk</a>!</p>}
			</Section>
		);
	}
}

export default SongsSection;
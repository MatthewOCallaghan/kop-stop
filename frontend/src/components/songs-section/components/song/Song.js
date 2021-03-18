import React, { Component } from 'react';
import './Song.css';
import printLyrics from '../../../../functions/printLyrics';

import VideoPlayer from '../video-player/VideoPlayer';
import TagList from '../../../tag-list/TagList';

class Song extends Component  {

	constructor(props) {
		super(props);
		this.state = {
			song: props.song,
			expanded: false
		}
	}

	expand = () => {
		this.setState({
			expanded: true
		});
	}

	collapse = () => {
		this.setState({
			expanded: false
		});
	}

	render() {
		const { song, expanded } = this.state;
		const { index } = this.props;
		return (
			<div className={expanded ? "song" : "song pointer"} onClick={!expanded ? this.expand : undefined} data-toggle={!expanded ? "collapse" : undefined} data-target={!expanded ? `#collapse${index}` : undefined}>
				{expanded &&
				<button type="button" className="close" aria-label="Close" data-toggle="collapse" data-target={`#collapse${index}`} onClick={this.collapse}>
		  				<span aria-hidden="true">&times;</span>
				</button>
				}
				<h3 className={(expanded && song.tune) || song.dateAdded ? 'no-bottom-margin' : undefined}>{song.title}</h3>
				{song.dateAdded && 
					<p className="italic">Added {song.contributorName ? `by ${song.contributorName} ` : ""}on {song.dateAdded ? `${song.dateAdded.slice(8,10)}/${song.dateAdded.slice(5,7)}/${song.dateAdded.slice(0,4)}` : ""}</p>
				}
				<div className="collapse" id={`collapse${index}`}>
					{song.tune && 
						<p className="italic">(To the tune of {song.tune})</p>
					}
					{printLyrics(song.lyrics)}

					{expanded && song.id &&
						<VideoPlayer songId={song.id} />
					}

				</div>
				<TagList tags={song.tags} />
			</div>
		);
	};
}

export default Song;
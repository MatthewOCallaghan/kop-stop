import React from 'react';
import './SongList.css';

import Song from '../song/Song';

const list = (songs, key) => {
	return (
		<div>
		{
			songs.map((song, index) => 
				<Song
					key={song.title + song.lyrics + index}
					song={song}
					index={key + index}
				/>
			)
		}
		</div>
	);
}

const SongList = ({ songs, width }) => {
	let titledSongs = [];
	if(!songs[0]) {
		for(const subject in songs) {
			titledSongs.push([subject, songs[subject]]);
		}
		titledSongs.sort(function(a, b) {
			const aName = a[0].toLowerCase().split(' ');
			const bName = b[0].toLowerCase().split(' ');
			return aName[aName.length - 1].localeCompare(bName[bName.length - 1]);
		});
	}
	return (
		<div className="song-list">
			{ songs[0]
				?	list(songs, '')
				:  	titledSongs.map(subjectSongs =>
						<div key={subjectSongs[0]}>
							<h2 className="signature">{subjectSongs[0]}</h2>
							{list(subjectSongs[1], subjectSongs[0].replace(/ /g,''))}
						</div>
					)
			}
		</div>
	);
}

export default SongList;
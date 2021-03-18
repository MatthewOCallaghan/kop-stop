const analytics = require('./analytics');

const getLaunchData = (req, res, database) => {
	analytics.newVisitor(database);
	database.select('songs.id', 'songs.title', 'songs.tune', 'songs.lyrics', 'tags.name', 'tags.category', 'tag_map.position')
	.from('songs', 'tags')
	.leftOuterJoin('tag_map', 'songs.id', 'tag_map.song_id')
	.join('tags', 'tags.id', 'tag_map.tag_id')
	.then(songs => {
		let data = [{},{}];
		songs.forEach(song => {
			if(data[0][song.id]) {
				data[0][song.id].tags[song.position] = [song.name, song.category];
			} else {
				data[0][song.id] = {
					id: song.id,
					title: song.title,
					tune: song.tune,
					lyrics: song.lyrics,
					tags: []
				};
				data[0][song.id].tags[song.position] = [song.name, song.category];
			}
		});
		database.select('suggested_songs.id', 'suggested_songs.title', 'suggested_songs.tune', 'suggested_songs.lyrics', 'suggested_songs.contributor_name', 'suggested_songs.video_reference', 'suggested_songs.date_added', 'tags.name', 'tags.category', 'suggested_songs_tag_map.position')
			.from('suggested_songs', 'suggested_songs_tag_map', 'tags')
			.leftOuterJoin('suggested_songs_tag_map', 'suggested_songs.id', 'suggested_songs_tag_map.suggested_song_id')
			.join('tags', 'tags.id', 'suggested_songs_tag_map.tag_id')
			.orderBy('suggested_songs.date_added', 'asc')
			.then(suggestedSongs => {
				data.push(suggestedSongs[0].id);
				suggestedSongs.forEach(song => {
					if(data[1][song.id]) {
						data[1][song.id].tags[song.position] = [song.name, song.category];
					} else {
						data[1][song.id] = {
							title: song.title,
							tune: song.tune,
							lyrics: song.lyrics,
							contributorName: song.contributor_name,
							videoReference: song.video_reference,
							dateAdded: song.date_added,
							tags: []
						};
						data[1][song.id].tags[song.position] = [song.name, song.category];
					}
				});
				database('videos')
					.select('*')
					.where(database.raw('date_added = (SELECT max(date_added) FROM videos)'))
					.then(video => {
						data.push(video[0]);
						res.json(data);
					})
					.catch(error => res.status(400).json("Error getting video"));
			})
			.catch(error => res.status(400).json("Error getting suggested songs"));
	})
	.catch(error => res.status(400).json("Error getting songs"));
}

module.exports = {
	getLaunchData: getLaunchData
}
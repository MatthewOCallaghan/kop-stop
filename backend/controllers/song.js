const addSong = (req, res, database) => {
	const { title, tune, lyrics, tags } = req.body;
	const tagsAndCategories = tags.map(tag => {
		return tag.split(":");
	});

	database('songs')
		.insert({
			title: title,
			tune: tune,
			lyrics: lyrics
		})
		.returning('id')
			.then(songIdArray => {
				songId = songIdArray[0];

				const updateTag = (index) => {
					tagName = tagsAndCategories[index][0];
					category = tagsAndCategories[index][1];
					database('tags').where({
						name: tagName,
						category: category
					}).select('id')
						.then(tagIdArray => {
							tagId = tagIdArray[0];
							if(tagId) {
								database('tag_map')
									.insert({
										song_id: songId,
										tag_id: tagId.id,
										position: index
									})
									.then(result => {
										index++;
										if(index !== tagsAndCategories.length) {
											updateTag(index);
										}
									})
									.catch(console.log);
							} else {
								database('tags')
									.insert({
										name: tagName,
										category: category
									})
									.returning('id')
										.then(newTagIdArray => {
											newTagId = newTagIdArray[0];
											database('tag_map')
												.insert({
													song_id: songId,
													tag_id: newTagId,
													position: index
												})
												.then(result => {
													index++;
													if(index !== tagsAndCategories.length) {
														updateTag(index);
													}
												})
												.catch(console.log);
										})
										.catch(console.log);
							}
						})
						.catch(console.log);
				}

				updateTag(0);
				res.json("No errors");
			})
			.catch(error => res.status(400).json("Error:", error));
}

const addSuggestedSong = (req, res, database) => {
	const { title, tune, lyrics, contributorName, contributorEmail, videoReference, tags } = req.body;
	const tagsAndCategories = tags.map(tag => {
		return tag.split(":");
	});

	database('suggested_songs')
		.insert({
			title: title,
			tune: tune,
			lyrics: lyrics,
			contributor_name: contributorName,
			contributor_email: contributorEmail,
			video_reference: videoReference,
			date_added: new Date()
		})
		.returning('id')
			.then(songIdArray => {
				songId = songIdArray[0];

				const updateTag = (index) => {
					tagName = tagsAndCategories[index][0];
					category = tagsAndCategories[index][1];
					database('tags').where({
						name: tagName,
						category: category
					}).select('id')
						.then(tagIdArray => {
							tagId = tagIdArray[0];
							if(tagId) {
								database('suggested_songs_tag_map')
									.insert({
										suggested_song_id: songId,
										tag_id: tagId.id,
										position: index
									})
									.then(result => {
										index++;
										if(index !== tagsAndCategories.length) {
											updateTag(index);
										}
									})
									.catch(console.log);
							} else {
								database('tags')
									.insert({
										name: tagName,
										category: category
									})
									.returning('id')
										.then(newTagIdArray => {
											newTagId = newTagIdArray[0];
											database('suggested_songs_tag_map')
												.insert({
													suggested_song_id: songId,
													tag_id: newTagId,
													position: index
												})
												.then(result => {
													index++;
													if(index !== tagsAndCategories.length) {
														updateTag(index);
													}
												})
												.catch(console.log);
										})
										.catch(console.log);
							}
						})
						.catch(console.log);
				}

				updateTag(0);
				res.json("No errors");
			})
			.catch(error => res.status(400).json("Error!" + error));
}

const getSongs = (req, res, database) => {
	database.select('songs.id', 'songs.title', 'songs.tune', 'songs.lyrics', 'tags.name', 'tags.category', 'tag_map.position')
	.from('songs', 'tag_map', 'tags')
	.leftOuterJoin('tag_map', 'songs.id', 'tag_map.song_id')
	.join('tags', 'tags.id', 'tag_map.tag_id')
	.then(data => {
		let songs = [{},{}];
		data.forEach(song => {
			if(songs[0][song.id]) {
				songs[0][song.id].tags[song.position] = [song.name, song.category];
			} else {
				songs[0][song.id] = {
					id: song.id,
					title: song.title,
					tune: song.tune,
					lyrics: song.lyrics,
					tags: []
				};
				songs[0][song.id].tags[song.position] = [song.name, song.category];
			}
		});
		database.select('suggested_songs.id', 'suggested_songs.title', 'suggested_songs.tune', 'suggested_songs.lyrics', 'suggested_songs.contributor_name', 'suggested_songs.video_reference', 'suggested_songs.date_added', 'tags.name', 'tags.category', 'suggested_songs_tag_map.position')
			.from('suggested_songs', 'suggested_songs_tag_map', 'tags')
			.leftOuterJoin('suggested_songs_tag_map', 'suggested_songs.id', 'suggested_songs_tag_map.suggested_song_id')
			.join('tags', 'tags.id', 'suggested_songs_tag_map.tag_id')
			.then(data => {
				data.forEach(song => {
					if(songs[1][song.id]) {
						songs[1][song.id].tags[song.position] = [song.name, song.category];
					} else {
						songs[1][song.id] = {
							title: song.title,
							tune: song.tune,
							lyrics: song.lyrics,
							contributorName: song.contributor_name,
							videoReference: song.video_reference,
							dateAdded: song.date_added,
							tags: []
						};
						songs[1][song.id].tags[song.position] = [song.name, song.category];
					}
				});
				res.json(songs);
			})
			.catch(error => res.status(500).json("Error getting suggested songs"));
	})
	.catch(error => res.status(500).json("Error getting songs"));
}

module.exports = {
	addSong: addSong,
	addSuggestedSong: addSuggestedSong,
	getSongs: getSongs
}
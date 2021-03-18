const newVisitor = database => {
	database('visitors')
		.insert({
			date: new Date()
		})
		.catch(console.log);
}

const songViewed = (database, songId) => {
	database('song_views')
		.insert({
			song_id: songId,
			date: new Date()
		})
		.catch(console.log);
}

module.exports = {
	newVisitor: newVisitor,
	songViewed: songViewed
}
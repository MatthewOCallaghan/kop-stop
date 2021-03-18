const fs = require('fs');
const path = require('path');
const ThumbnailGenerator = require('video-thumbnail-generator').default;
const analytics = require('./analytics');

const addVideo = (req, res, database) => {
	const { song, contributorName } = req.body;
	database('songs')
		.where('title', song)
		.select('id')
		.then(id => {
			database('videos').insert({
				song_id: id[0].id,
				contributor_name: contributorName,
				date_added: new Date()
			})
			.returning('id')
			.then(id => res.json(id[0]))
			.catch(error => res.status(400).json("Video could not be added"));
		})
		.catch(error => res.status(400).json("Unable to find song"));
}

const getVideos = (req, res, database) => {
	database('videos')
		.select('*')
		.then(data => res.json(data))
		.catch(error => res.status(400).json("Error getting videos"));
}

const getSongVideos = (req, res, database) => {
	const { songId } = req.params;
	analytics.songViewed(database, songId);
	database('videos')
		.select('*')
		.where('song_id', songId)
		.then(videos => {
			
			res.json(videos);
		})
		.catch(error => res.status(400).json('Error getting videos'));
}

const getVideo = (req, res) => {
	const { videoId } = req.params;
	const path = `videos/${videoId}.mp4`;
  	const stat = fs.statSync(path);
  	const fileSize = stat.size;
  	const range = req.headers.range;

  	if (range) {
    	const parts = range.replace(/bytes=/, "").split("-");
    	const start = parseInt(parts[0], 10);
    	const end = parts[1]
      		? parseInt(parts[1], 10)
      		: fileSize-1

    	const chunksize = (end-start)+1;
    	const file = fs.createReadStream(path, {start, end});
    	const head = {
      		'Content-Range': `bytes ${start}-${end}/${fileSize}`,
      		'Accept-Ranges': 'bytes',
      		'Content-Length': chunksize,
      		'Content-Type': 'video/mp4',
    	};

    	res.writeHead(206, head);
    	file.pipe(res);
  	} else {
    	const head = {
      		'Content-Length': fileSize,
      		'Content-Type': 'video/mp4',
    	};
    	res.writeHead(200, head);
    	fs.createReadStream(path).pipe(res);
  	}	
}

 const getVideoThumbnail = (req, res) => {
 	const { videoId } = req.params;
 	const tg = new ThumbnailGenerator({
  		sourcePath: `videos/${videoId}.mp4`,
  		thumbnailPath: 'thumbnails/',
	});
	tg.generate()
		.then(result => res.json(result));
 }

module.exports = {
	addVideo: addVideo,
	getVideos: getVideos,
	getSongVideos: getSongVideos,
	getVideo: getVideo
}
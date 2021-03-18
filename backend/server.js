const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const knex = require('knex');

const database = knex({
	client: 'pg',
	connection: {
		connectionString: process.env.DATABASE_URL,
		ssl: {
			rejectUnauthorized: false
		}
	}
});

const launch = require('./controllers/launch');
const song = require('./controllers/song');
const video = require('./controllers/video');
const app = express();

app.use(bodyParser.json({limit: "50mb"}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));

app.use(cors());

app.get('/', (req, res) => {
	res.send('this is working');
});

app.get('/data', (req, res) => launch.getLaunchData(req, res, database));

app.get('/songs', (req, res) => song.getSongs(req, res, database));

app.get('/videos', (req, res) => video.getVideos(req, res, database));

app.get('/videos/:songId', (req, res) => video.getSongVideos(req, res, database));

app.get('/video/:videoId', (req, res) => video.getVideo(req, res));

app.get('/video-thumbnail/:videoId', (req, res) => video.getVideoThumbnail(req, res));

// Endpoints for adding songs
// Authentication required
// app.post('/song', (req, res) => song.addSong(req, res, database));

// app.post('/suggested-song', (req, res) => song.addSuggestedSong(req, res, database));

// app.post('/video', (req, res) => video.addVideo(req, res, database));

app.listen(process.env.PORT || 3000, () => {
	console.log(`Server is running on port ${process.env.PORT}`);
});
import React from 'react';
import './VideoList.css';

const VideoList = ({ videos, vertical, currentVideo, changeVideo, maxHeight }) => {
	const flexDirection = vertical ? 'column' : 'row';
	const width = vertical ? '35%' : '100%';
	const margin = vertical ? '0 0 0 0.5rem' : '0';
	return (
		<div className='video-list' id={`video-list-${videos[0].song_id}`} style={{flexDirection: flexDirection, width: width, margin: margin, maxHeight: maxHeight}}>
			{
				videos.map((video, index) => 
					<div className={index === currentVideo ? 'video-details-selected' : `video-details-unselected ${index%2 ? 'light' : 'dark'}`} onClick={() => changeVideo(index, video.contributor_name)} key={'video' + video.song_id + index}>
						<span className='contributor-name'>{video.contributor_name ? video.contributor_name : 'Anonymous'}</span>
						<span className='date-added'>{`Added on ${video.date_added.slice(8,10)}/${video.date_added.slice(5,7)}/${video.date_added.slice(0,4)}`}</span>
					</div>
				)
			}
		</div>
	);
}

export default VideoList;
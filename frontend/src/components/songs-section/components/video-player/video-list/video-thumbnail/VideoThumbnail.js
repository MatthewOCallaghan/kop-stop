import React from 'react';
import ReactVideoThumbnail from 'react-video-thumbnail';

class VideoThumbnail extends ReactVideoThumbnail {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		console.log(this.refs.child ? true : false);
	}

	render() {
		return (
			<div ref='child'>
				{true && <ReactVideoThumbnail
				    videoUrl={this.props.videoUrl}
				    thumbnailHandler={thumbnail => console.log(this)}
				    width={200}
				    height={100}
				    />
				}
			</div>
		);
	}
}

export default VideoThumbnail;
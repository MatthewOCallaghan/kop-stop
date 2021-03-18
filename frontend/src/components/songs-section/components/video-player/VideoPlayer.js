import React, { Component } from 'react';
import './VideoPlayer.css';
// import VideoThumbnail from './video-list/video-thumbnail/VideoThumbnail';
import VideoList from './video-list/VideoList';

class VideoPlayer extends Component {

	constructor(props) {
		super(props);
		this.videoWindow = React.createRef();
		this.video = React.createRef();
		this.state = {
			songId: props.songId,
			currentVideo: 0,
			videoListHeight: 0
		};
	}

	componentDidMount() {
		const { songId } = this.state;
    	fetch(`https://kop-stop-api.herokuapp.com/videos/${songId}`)
    		.then(response => response.json() )
      		.then(data => {
      			this.setState({
      				videos: data
      			});
      		})
      		.then(result => {
      			if(this.videoWindow) {
      				this.setState({
      					videoListHeight: this.videoWindow.current.clientHeight
      				});
      			}
      			if(this.state.videos && document.getElementById(`video${this.state.videos[this.state.currentVideo].id}`)) {
      				document.getElementById(`video${this.state.videos[this.state.currentVideo].id}`).onloadeddata = () => this.updateDimensions();
      			}
      		})
      		.then(result => {
      			window.addEventListener('resize', this.updateDimensions.bind(this));
      		})
      		.catch(error => console.log(error));
  	}

  	componentWillUnmount() {
    	window.removeEventListener("resize", this.updateDimensions.bind(this));
  	}

  	changeVideo = (newVideo, contributorName) => {
  		if(newVideo >= 0 && newVideo < this.state.videos.length) {
  			this.setState({
  				currentVideo: newVideo
  			}, () => document.getElementById(`video${this.state.videos[this.state.currentVideo].id}`).onloadeddata = () => this.updateDimensions());
  			this.updateDimensions();
  		}
  	}

  	updateDimensions = () => {
  		if(this.videoWindow) {
	  		this.setState({
				videoListHeight: this.videoWindow.current.clientHeight
			});
  		} else {
  			this.setState(this.state);
  		}
  	}

	render() {
		const { videos, currentVideo } = this.state;
		const wideScreen = window.innerWidth < 1100 ? false : true;
		return (
			<div className='video-player' style={videos && videos[0] && {padding: '0.5rem'}}>
				{videos
					?   videos[0]
							?   <div>
									<div className='display-row'>
										<div ref={this.videoWindow} style={wideScreen ? {width: '65%'} : {width: '100%'}}>
											<video id={`video${videos[currentVideo].id}`} ref={this.video} width='100%' height='auto' key={`https://kop-stop-api.herokuapp.com/video/${videos[currentVideo].id}`} controls>						
												<source src={`https://kop-stop-api.herokuapp.com/video/${videos[currentVideo].id}`} type="video/mp4"/>
											</video>
											<p style={!wideScreen ? {marginBottom: '0.5rem'} : undefined}>Contributed {videos[currentVideo].contributor_name && 'by '} <span className='red italic'>{videos[currentVideo].contributor_name ? `${videos[currentVideo].contributor_name}` : `anonymously`}</span> on <span className='red italic'>{`${videos[currentVideo].date_added.slice(8,10)}/${videos[currentVideo].date_added.slice(5,7)}/${videos[currentVideo].date_added.slice(0,4)}`}</span></p>
											{/*<div className='thumbnail' id='thumbnail'>
												<VideoThumbnail
												    videoUrl={`https://kop-stop-api.herokuapp.com/video/${videos[0].id}`}
												    
												    />
											</div>*/
											}
										</div>
										{wideScreen && <VideoList videos={videos} vertical={wideScreen} currentVideo={currentVideo} changeVideo={this.changeVideo} maxHeight={this.state.videoListHeight}/>}
									</div>
								{!wideScreen && <VideoList videos={videos} vertical={wideScreen} currentVideo={currentVideo} changeVideo={this.changeVideo} maxHeight={this.state.videoListHeight}/>}
								</div>
							: <p>No videos have been added for this song yet!  Why not send us one at <a href="mailto:hello@kopstop.co.uk?subject=Submission">hello@kopstop.co.uk</a>?</p>
					: <p>Loading videos...</p>
				}
			</div>
		);
	}

}

export default VideoPlayer;
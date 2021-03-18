import React from 'react';
import './BootRoom.css';
import Section from '../section/Section.js';

import SubmissionsPrompt from './components/SubmissionsPrompt';
import LatestSuggestedSong from './components/LatestSuggestedSong';
import LatestVideo from './components/LatestVideo';
import TwitterFeed from './components/TwitterFeed';
import MatchdayCountdown from './components/MatchdayCountdown';

const BootRoom = ({ latestVideo, latestSuggestedSong }) => {
	return (
		<Section id="boot-room" title="Boot Room" titleColour="red" backgroundColour="white">
			<div className="container-fluid">
				<div className="row">
					<div className="col-md-4">
						<div className="row">
							<div className="col-sm-12">
								<SubmissionsPrompt className="boot-room-component" />
							</div>
						</div>
						<div className="row">
							<div className="col-sm-12">
								<LatestVideo className="boot-room-component" latestVideo={latestVideo} />
							</div>
						</div>
					</div>
					<div className="col-md-4">
						<LatestSuggestedSong className="boot-room-component" latestSuggestedSong={latestSuggestedSong} />
					</div>
					<div className="col-md-4">
						<TwitterFeed className="boot-room-component" />
					</div>
				</div>
				<div className="row">
					<MatchdayCountdown className="col-sm-12 boot-room-component" />
				</div>
			</div>
		</Section>
	);
}

export default BootRoom;
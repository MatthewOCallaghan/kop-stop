import React from 'react';
import Section from '../section/Section.js';

import SubmissionsPrompt from './components/SubmissionsPrompt';

const BootRoom = () => {
	return (
		<Section title="Boot Room" titleColour="red" backgroundColour="white">
			<div className="container-fluid border border-danger">
				<SubmissionsPrompt className="border border-dark" />
			</div>
		</Section>
	);
}

export default BootRoom;
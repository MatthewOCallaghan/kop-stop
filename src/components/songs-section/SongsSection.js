import React from 'react';
import Section from '../section/Section';
import { songs } from '../../songs/songs.js';

const SongsSection = () => {
	return (
		<Section title="Songs" titleColour="black" backgroundColour="red">
			<h1>{songs[0].title}</h1>
			<p>{songs[0].lyrics}</p>
		</Section>
	);
}

export default SongsSection;
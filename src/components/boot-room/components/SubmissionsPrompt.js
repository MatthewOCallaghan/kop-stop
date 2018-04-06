import React from 'react';

const SubmissionsPrompt = ({ className }) => {
	return (
		<div className={className}>
			<h2>We want your songs, chants and videos!</h2>
			<p>
				Have you got a song that would be perfect for the Kop?<br/>
				Or a video of Liverpool fans belting out a classic?
			</p>
			<p>
				Then we'd love to hear from you! You'll receive credit for any song, chant or video that you send in (if you wish, of course!).
			</p>
			<p>
				<a href="#">So click here to send us the next Kop song or a video of a current Anfield favourite!</a>
			</p>
		</div>
	);
}

export default SubmissionsPrompt;
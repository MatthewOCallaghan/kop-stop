import React from 'react';

const TwitterFeed = ({ className }) => {
	return (
		<div className={className} style={{overflow: 'hidden', height: '300'}}>
			 <a className="twitter-timeline" data-height="500" data-theme="dark" data-link-color="#E81C4F" href="https://twitter.com/Kop_Stop?ref_src=twsrc%5Etfw">Tweets by Kop_Stop</a>
		</div>
	);
}

export default TwitterFeed;
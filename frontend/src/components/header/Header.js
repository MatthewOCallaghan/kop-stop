import React from 'react';
import './Header.css';

const Header = () => {
	return (
			<header id='header'>
				<div className="intro">
					<h2 className="signature">Welcome to</h2>
					<span className="kop-stop-title"><span className="red">Kop</span> Stop</span>
					<p>With over one hundred different sets of lyrics, we're the home of all the greatest songs and chants to ever have been belted out on the Anfield Kop in support of Liverpool Football Club.</p>
					<p>Send us in your videos of LFC fans in full voice, or the next Kop song that you've come up with, and we'll give credit right here on our website!</p>
					<div>
						<a className="twitter-follow-button" href="https://twitter.com/Kop_Stop" data-show-count="false"> </a>
					</div>
				</div>
			</header>
	);
}

export default Header;
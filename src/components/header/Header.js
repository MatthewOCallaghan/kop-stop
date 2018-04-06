import React from 'react';
import './Header.css';

const Header = () => {
	return (
			<header id='header'>
				<div className="intro">
					<h2 className="signature">Welcome to</h2>
					<h1 className="shine"><span className="red">Kop</span> Stop</h1>
					<p>With over one hundred different sets of lyrics, we're the home of all the greatest songs and chants to ever have been belted out on the Anfield Kop in support of Liverpool Football Club.</p>
				</div>
			</header>
	);
}

export default Header;
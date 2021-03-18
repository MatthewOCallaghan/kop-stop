import React from 'react';
import './Navbar.css';

const Navbar = () => {
	return (
		<nav id="navbar" className="navbar fixed-top navbar-expand-sm navbar-light border-bottom border-danger bg-white">
			<a id="logo" className="navbar-brand" href="#header"><span className="red">K</span>S</a>
			
			<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    			<span className="navbar-toggler-icon"></span>
  			</button>

  			<div className="collapse navbar-collapse" id="navbarSupportedContent">
				<ul className="navbar-nav mr-auto">
					{/*}
					<li className="nav-item">
						<a className="nav-link" href="#boot-room">Boot Room</a>
					</li>
				*/}
					<li className="nav-item">
						<a className="nav-link" href="#songs-section">Songs</a>
					</li>
					<li className="nav-item">
						<a className="nav-link" href="#submissions-section">Submissions</a>
					</li>
				</ul>
			</div>
		</nav>
	);
}

export default Navbar;
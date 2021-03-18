import React from 'react';
import categoryColour from '../../../../functions/categoryColour';
import './NavCategory.css';

const NavCategory = ({ name, currentCategory, switchCategory }) => {
	const categoryName = name.toLowerCase();
	let colour = categoryColour(categoryName).toLowerCase();
	if(colour === 'red') {
		colour = 'white';
	}
	if(categoryName === currentCategory) {
		return (<p style={{color: colour}}>{name}</p>);
	}
	return (
		<a
			onClick={() => switchCategory(categoryName)}
			className={`${colour}-hover`}
		>
			{name}
		</a>
	);
}

export default NavCategory;
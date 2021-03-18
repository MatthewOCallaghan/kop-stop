import React from 'react';
import './SearchBox.css';

const SearchBox = ({ searchChange }) => {
	return (
		<input
			id="searchfield"
			className="form-control"
			type='search'
			placeholder={window.innerWidth <= 530 ? 'Search' : 'Search for a song, player, manager or club'}
			onChange={searchChange}
		/>
	);
}

export default SearchBox;
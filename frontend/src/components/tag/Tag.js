import React from 'react';
import './Tag.css';
import categoryColour from '../../functions/categoryColour';

const Tag = ({name, category}) => {
	return (
		<span className="tag" style={{backgroundColor: categoryColour(category)}}>
			{name}
		</span>
	);
}

export default Tag;
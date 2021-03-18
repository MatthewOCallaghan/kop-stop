import React from 'react';
import Tag from '../tag/Tag';
import './TagList.css';

const TagList = ({ tags }) => {
	return (
		<div className="tag-list">
			{
				tags.map((tag, index) => 
					<Tag
						key={index}
						name={tag[0]}
						category={tag[1]}
					/>
				)
			}
		</div>
	);
}

export default TagList;
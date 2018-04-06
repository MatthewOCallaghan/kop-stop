import React from 'react';
import './Section.css';

const Section = (props) => {
	const { title, backgroundColour, titleColour } = props;
	return (
		<section style={{ backgroundColor: backgroundColour }}>
			<h1 className="signature" style={{color: titleColour}} >{title}</h1>
			{props.children}
		</section>
	);
}

export default Section;
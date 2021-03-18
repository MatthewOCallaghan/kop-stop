import React from 'react';
import './Section.css';

const Section = (props) => {
	const { title, backgroundColour, titleColour, id } = props;
	return (
		<section id={id} style={{ backgroundColor: backgroundColour }}>
			<h1 className="signature" style={{color: titleColour}} >{title}</h1>
			{props.children}
		</section>
	);
}

export default Section;
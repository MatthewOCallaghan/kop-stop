const categoryColour = category => {
	switch(category) {
		case 'general':
			return 'Red';
		case 'current players':
			return 'LimeGreen';
		case 'former players':
			return 'Green';
		case 'managers':
			return 'DarkOrange';
		case 'rival players':
			return 'DeepSkyBlue';
		case 'rival managers':
			return 'MediumBlue'
		case 'rival clubs':
			return 'SlateGrey';
		case 'suggested songs':
			return 'Gold';
		default:
			return 'White';
	}
}

export default categoryColour;
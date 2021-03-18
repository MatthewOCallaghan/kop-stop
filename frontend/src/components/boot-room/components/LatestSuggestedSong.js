import React from 'react';
import TagList from '../../tag-list/TagList';
import printLyrics from '../../../functions/printLyrics';

const LatestSuggestedSong = ({ className, latestSuggestedSong }) => {
	const { title, tune, lyrics, contributorName, dateAdded, videoReference, tags} = latestSuggestedSong;
    return (
		<div className={className}>
			<h2 className="no-bottom-margin">Latest suggested song</h2>
			<p className="italic">Added {contributorName ? `by ${contributorName} ` : ""}on {dateAdded ? `${dateAdded.slice(8,10)}/${dateAdded.slice(5,7)}/${dateAdded.slice(0,4)}` : ""}</p>
			<h3 className={tune? 'no-bottom-margin' : ''}>{title}</h3>
			{tune && <p className="italic">(To the tune of {tune})</p>}
            {printLyrics(lyrics)}
            {
                videoReference &&
                <video width='70%' height='auto'>
                    <source src={`../../../videos/suggested-songs/${videoReference}.mp4`} type="video/mp4" />
                    {//<source src={`../../../videos/suggested-songs/${videoReference}.ogg`} type="video/ogg" />
                    }
                    Sorry, your browser does not support this video.
                </video>
            }
            {tags && <TagList tags={tags} />}
		</div>
	);
}

export default LatestSuggestedSong;
import React from 'react';
import TagList from '../../tag-list/TagList';

const LatestVideo = ({ className, latestVideo }) => {
	const { contributor_name, date_added, tags, id, songName } = latestVideo;
	return (
		<div className={className}>
			<h2 className='no-bottom-margin'>Latest video</h2>
			<p className="italic">Added {contributor_name ? `by ${contributor_name} ` : ""}on {date_added ? `${date_added.slice(8,10)}/${date_added.slice(5,7)}/${date_added.slice(0,4)}` : ""}</p>
			<h3>{songName}</h3>
			{
               latestVideo &&
                <video width='70%' height='auto'>
                	<source src={`../../../videos/suggested-songs/BobbyFirmino.mp4`} type="video/mp4" />
                    {//<source src={`../../../videos/${id}.mp4`} type="video/mp4" />}
                    }
                    {//<source src={`../../../videos/suggested-songs/${videoReference}.ogg`} type="video/ogg" />
                    }
                    Sorry, your browser does not support this video.
                </video>
            }
            {tags && <TagList tags={tags} />}
		</div>
	);
}

export default LatestVideo;
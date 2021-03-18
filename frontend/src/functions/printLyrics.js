import React from 'react';

const printLyrics = lyrics => {
    if(!lyrics) {
    	return <p></p>;
    } else {
    	lyrics = lyrics.split('\n');
        return (
            <p>
                {lyrics.map((line, index) => 
                    <span key={index}>
                        {line.includes('[')
                            ?   <span>
                                    {line.slice(0,line.indexOf('[')+1)}
                                    <span style={{fontStyle: 'italic'}}>{line.slice(line.indexOf('[')+1, line.indexOf(']'))}</span>
                                    {line.slice(line.indexOf(']'))}
                                </span>
                            :   line
                        }
                        <br/>
                    </span>
                )}
            </p>
        );
    }
}

export default printLyrics;
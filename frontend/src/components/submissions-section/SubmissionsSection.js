import React, { Component } from 'react';
// import FormData from 'form-data';
import Section from '../section/Section.js';
import './SubmissionsSection.css';

class SubmissionsSection extends Component {

	constructor(props) {
		super(props);
		this.state = {
			song: {
				title: '',
				tune: '',
				lyrics: '',
				video: null,
				contributorName: '',
				contributorEmail: ''
			}
		}
	}

	handleSongSubmission = event => {
		event.preventDefault();
		let form = document.getElementById('song-submission-form');
		let formData = new FormData(form);
		// formData.append('song-submission-video', songSubmissionVideo);
		let data = {};
		for (var [key, value] of formData.entries()) { 
			data[key] = value;
		}

		console.log(formData);
		fetch('http://localhost:3000/song-submission', {
      		method: 'post',
      		headers: {
        		'Content-Type': 'application/json'
      		},
		     body: JSON.stringify(data)
		      // JSON.stringify({
		      //   email: this.state.signInEmail,
		      //   password: this.state.signInPassword
		      // })
		})
		    .then(response => response.json())
		      .then(result => {
		        console.log(result);
		      });


	}

	// fileUpload = (event) => {
	// 	console.log(event);
	// }

	render() {
		return (
			<Section id="submissions-section" title="Submissions" titleColour="white" backgroundColour="black">
				<div className="container-fluid">

					<p>
						Have you got a song that would be perfect for the Kop?<br/>
						Or a video of Liverpool fans belting out a classic?
					</p>
					<p>
						Then we'd love to hear from you! You'll receive credit for any song, chant or video that you send in (if you wish, of course!).
					</p>

					<p>
						So email us the next Kop song or a video of a current Anfield favourite at <a href="mailto:hello@kopstop.co.uk?subject=Submission">hello@kopstop.co.uk</a>!
					</p>

					{/*
					<div className='row'>
						<div className='col-md-6'>
							<div className='submission'>
								<h2 className='signature'>Submit a song</h2>
								<form id='song-submission-form' action='' name='song-submission-formission' onSubmit={this.handleSongSubmission} encType='multipart/form-data'>
									<div className="form-group">
										<label htmlFor="song-submission-title">Title</label>
									    <input type="text" className="form-control" id="song-submission-title" name="title" aria-describedby="song-submission-title-help" placeholder="Enter song title" required />
									    <small id="song-submission-title-help" className="form-text text-muted">Required.  </small>
									</div>
									<div className="form-group">
										<label htmlFor="song-submission-tune">Tune</label>
									    <input type="text" className="form-control" id="song-submission-tune" name="tune" aria-describedby="song-submission-tune-help" placeholder="Enter song tune"/>
									    <small id="song-submission-tune-help" className="form-text text-muted">Optional.  If your lyrics are to the tune of another song, enter it here.</small>
									</div>
									<div className="form-group">
									    <label htmlFor="song-submission-lyrics">Lyrics</label>
									    <textarea className="form-control" id="song-submission-lyrics" rows="5" name="lyrics" aria-describedby="song-submission-lyrics-help" placeholder="Enter lyrics" required></textarea>
									    <small id="song-submission-lyrics-help" className="form-text text-muted">Required.</small>
									</div>
									<div className="form-group">
									  	<label htmlFor="song-submission-video">Video</label>
									    <input type="file" className="form-control-file" id="song-submission-video" name="video" aria-describedby="song-submission-video-help" />
									    <small id="song-submission-video-help" className="form-text text-muted">Optional.  A video of your lyrics being sung is always a great way to help others pick it up - especially if it's not to a well-known tune.</small>
									</div>
									<div className="form-group">
										<label htmlFor="song-submission-contributor-name">Your name</label>
									    <input type="text" className="form-control" id="song-submission-contributor-name" name="contributor-name" aria-describedby="song-submission-contributor-name-help" placeholder="Enter your name"/>
									    <small id="song-submission-contributor-name-help" className="form-text text-muted">Optional.  2-25 characters.<br/>This name will be displayed publicly to credit you for your song.</small>
									</div>
									<div className="form-group">
									    <label htmlFor="song-submission-contributor-email">Your email address</label>
									    <input type="email" className="form-control" id="song-submission-contributor-email" name="contributor-email" aria-describedby="song-submission-contributor-email-help" placeholder="Enter your email" />
									    <small id="song-submission-contributor-email-help" className="form-text text-muted">Optional.  Your email address will only ever be used to contact you regarding your song and will never be shared with anyone.</small>
									</div>
									<div className="form-group">
									    <div className="form-check">
									    	<input className="form-check-input" type="checkbox" value="" id="song-submission-check" name="terms" required />
									    	<label className="form-check-label" htmlFor="song-submission-check">
									        	I agree to the terms and conditions.
									      	</label>
									      	<small id="song-submission-check" className="form-text text-muted">Required.</small>
									    </div>
								 	</div>
								 	<button type="submit" className="btn btn-danger">Submit</button>
								</form>
							</div>
						</div>
						<div className='col-md-6'>
							<div className='submission'>
								<h2 className='signature'>Submit a video</h2>
								<form>
									<div className="form-group">
										<label htmlFor="video-submission-song">Song</label>
									    <input type="text" className="form-control" id="video-submission-song" name="song" aria-describedby="video-submission-song-help" placeholder="Enter song title" required />
									    <small id="video-submission-song-help" className="form-text text-muted">Required.  Which Kop favourite is being belted out in your video?</small>
									</div>
									<div className="form-group">
									  	<label htmlFor="video-submission-video">Video</label>
									    <input type="file" className="form-control-file" id="video-submission-video" name="video" aria-describedby="video-submission-video-help" required />
									    <small id="video-submission-video-help" className="form-text text-muted">Required. (Obviously!)</small>
									</div>
									<div className="form-group">
										<label htmlFor="video-submission-contributor-name">Your name</label>
									    <input type="text" className="form-control" id="video-submission-contributor-name" name="contributor-name" aria-describedby="video-submission-contributor-name-help" placeholder="Enter your name"/>
									    <small id="video-submission-contributor-name-help" className="form-text text-muted">Optional.  2-25 characters.<br/>This name will be displayed publicly to credit you for your video.</small>
									</div>
									<div className="form-group">
									    <label htmlFor="video-submission-contributor-email">Your email address</label>
									    <input type="email" className="form-control" id="video-submission-contributor-email" name="contributor-email" aria-describedby="video-submission-contributor-email-help" placeholder="Enter your email" />
									    <small id="video-submission-contributor-email-help" className="form-text text-muted">Optional.  Your email address will only ever be used to contact you regarding your video and will never be shared with anyone.</small>
									</div>
									<div className="form-group">
									    <div className="form-check">
									    	<input className="form-check-input" type="checkbox" value="" id="video-submission-check" name="terms" required />
									    	<label className="form-check-label" htmlFor="video-submission-check">
									        	I agree to the terms and conditions.
									      	</label>
									      	<small id="video-submission-check" className="form-text text-muted">Required.</small>
									    </div>
								 	</div>
								 	<button type="submit" className="btn btn-danger">Submit</button>
								</form>
							</div>
						</div>
					</div>
					*/}

				</div>
			</Section>
		);
	}
}

export default SubmissionsSection;
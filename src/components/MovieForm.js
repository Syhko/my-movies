import React from 'react';
import './MovieForm.css';

class MovieForm extends React.Component {

	state = {
		poster : "",
		title : "",
		actors : "",
		year : "",
		genre : "",
		awards : "",
		writer : "",
		plot : "",
		ratings : ""
	}


	createMovie = async event => {
		event.preventDefault();

		await this.requestFetch();
		const movie = {
			poster: this.state.poster,
			title: this.state.title,
			actors : this.state.actors,
			year : this.state.year,
			genre : this.state.genre,
			awards : this.state.awards,
			writer : this.state.writer,
			plot : this.state.plot,
			ratings : this.state.ratings

		};

		if (movie.poster==="N/A") {
			alert("NO IMAGE FOUND");
			return false;
		}

		this.props.addMovie(movie);
		this.addForm.reset();
	}	

	requestFetch = () => {
		let currentComponent = this;
		let param=this.imageLink.value;

		return fetch(`https://www.omdbapi.com/?apikey=ffc03c92&t=${param}`)
		.then(response => response.json())
		.then(function(data) {
			console.log(data);
			const title=data.Title;
			const poster=data.Poster;
			const actors=data.Actors;
			const year=data.Year;
			const genre=data.Genre;
			const awards=data.Awards;
			const writer=data.Writer;
			const plot=data.Plot;
			const ratings=data.Ratings

		return currentComponent.setState({ poster : poster, title : title, actors : actors, year : year, genre : genre, awards : awards, writer : writer, plot : plot, ratings : ratings }, () => true);
		})
	}

	render () {

		return (
			<div className="ficheForm">
				<form className="addForm" ref={input => this.addForm = input} onSubmit={e => this.createMovie(e)} >
					<h1>HERE</h1>
					<p> ADD A MOVIE/SERIE TO YOUR DATABASE </p>
		  		<input required className="imageLink" placeholder="Title..." ref={input => this.imageLink = input} ></input>
		  		<button type="submit" className="addButton">
						Add
					</button>
					<p>(Click on a movie to see details)</p>
				</form>
			</div>
		);
	}
}



export default MovieForm;
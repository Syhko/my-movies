import React from 'react';
import './MovieFocus.css';

class MovieFocus extends React.Component {


	render () {

		const { closeMovieFocus, poster, plot, ratings, title, actors, year, awards, genre, writer } = this.props;

		return (

			<div className="wrapper">
				<button onClick={closeMovieFocus} className="overlayButtonFocus"><strong>X</strong></button>
				<div className="row">
					<div className="row_cell">
						<img className="imageFocus" src={poster} width="200" height="280" alt=""/>
					</div>
					<div className="row_cell">
						<p className="content"> <span style={{fontWeight: "bold"}}>Title : </span>{title} </p>
						<p className="content"> <span style={{fontWeight: "bold"}}>Actors : </span>{actors} </p>
						<p className="content"> <span style={{fontWeight: "bold"}}>Year : </span>{year} </p>
						<p className="content"> <span style={{fontWeight: "bold"}}>Awards : </span>{awards} </p>
						<p className="content"> <span style={{fontWeight: "bold"}}>Genre : </span>{genre} </p>
						<p className="content"> <span style={{fontWeight: "bold"}}>Writer : </span>{writer.length>=100 ? writer.substr(0,100)+"..." : writer} </p>
					</div>						
				</div>
				<div className="row_plot">
					<p style={{fontWeight: "bold"}}> {plot} </p>
				</div>
				<div className="footer">
					<p className="rates" style={{fontWeight: "bold"}}>IMDB : {(ratings != null && ratings.length >= 1) ? ratings[0].Value : "N/A"} </p>
					<p className="rates" style={{fontWeight: "bold"}}>Rotten Tomatoes : {(ratings != null && ratings.length >= 2) ? ratings[1].Value : "N/A"} </p>
					<p className="rates" style={{fontWeight: "bold"}}>Metacritic : {(ratings != null && ratings.length >= 3) ? ratings[2].Value : "N/A"} </p>
				</div>
			</div>

			);
	}
}

export default MovieFocus;
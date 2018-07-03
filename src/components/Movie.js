import React from 'react';
import './Movie.css';

function Movie(props) {
  return (
    <div className="fiche" id={props.id} >
      <img
        className="poster"
        src={props.poster}
        alt=""
        onClick={() => props.handleClick(props.id)}
      />
      <button onClick={() => props.deleteMovie(props.id)} className="overlayButton"><strong>X</strong></button>
    </div>
    );
}

export default Movie;

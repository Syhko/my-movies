import React from 'react';
import './Movie.css';

const Movie = ({
  id,
  poster,
  showDeleteMovie,
  hasBeenSeen,
  handleClick,
  deleteMovie,
  ficheType,
  posterType,
  isMovieSeen,
  isChecked
}) => (
    <div className={ficheType} id={id} >
      <img
        className={posterType}
        src={poster}
        alt=""
        onClick={() => handleClick(id)}
      />
      <button onClick={() => deleteMovie(id)} className={showDeleteMovie}><strong>X</strong></button>
      <input className={hasBeenSeen} type="checkbox" checked={isChecked} onChange={() => isMovieSeen(id)}></input>
    </div>
    )

export default Movie;

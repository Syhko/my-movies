import React from 'react';
import './MovieFocus.css';

function MovieFocus(props) {
  return (
    <div className="window_wrapper">
      <button className="closeMovieFocusButton" onClick={props.closeMovieFocus}>Close</button>
      <div className="row">
        <div className="row_cell">
          <img className="imageFocus" src={props.poster} alt="" />
        </div>
        <div className="row_cell">
          <p className="content"> <span style={{ fontWeight: 'bold' }}>Title : </span>{props.title} </p>
          <p className="content"> <span style={{ fontWeight: 'bold' }}>Year : </span>{props.date} </p>
          <p className="content"> <span style={{ fontWeight: 'bold' }}>Genre : </span>{props.genre} </p>
        </div>
      </div>
      <div className="row_plot">
        <p style={{ fontWeight: 'bold' }}> {props.plot} </p>
      </div>
      <div className="footer">
        <p className="rates" style={{ fontWeight: 'bold' }}>IMDB : {props.ratings} </p>
      </div>
    </div>

  );
}

export default MovieFocus;

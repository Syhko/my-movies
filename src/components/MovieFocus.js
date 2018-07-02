import React from 'react';
import './MovieFocus.css';

class MovieFocus extends React.Component {
  render() {
    const {
      poster, plot, ratings, title, actors, date, awards, genre, writer, isChecked
    } = this.props;


    return (
      <div className="wrapper">
        <div className="seen_box">
          <input type="checkbox" checked={isChecked}/>
          <p>Seen</p>
        </div>
        <div className="row">
          <div className="row_cell">
            <img className="imageFocus" src={poster} alt="" />
          </div>
          <div className="row_cell">
            <p className="content"> <span style={{ fontWeight: 'bold' }}>Title : </span>{title} </p>
            <p className="content"> <span style={{ fontWeight: 'bold' }}>Year : </span>{date} </p>
            <p className="content"> <span style={{ fontWeight: 'bold' }}>Genre : </span>{genre} </p>
          </div>
        </div>
        <div className="row_plot">
          <p style={{ fontWeight: 'bold' }}> {plot} </p>
        </div>
        <div className="footer">
          <p className="rates" style={{ fontWeight: 'bold' }}>IMDB : {ratings} </p>
        </div>
      </div>

    );
  }
}

export default MovieFocus;

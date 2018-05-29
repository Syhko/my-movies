import React from 'react';
import './Movie.css';

class Movie extends React.Component {
  render() {
    return (

      <div className="fiche" id={this.props.id} >

        <img
          className={ this.props.seen ? "poster_seen" : "poster_unseen" }
          src={this.props.poster}
          width="250"
          height="350"
          alt=""
          onClick={() => this.props.handleClick(this.props.id)}
        />
        <button onClick={() => this.props.deleteMovie(this.props.id)} className="overlayButton"><strong>X</strong></button>
      </div>
    );
  }
}

export default Movie;

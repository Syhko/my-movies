// REACT
import React, { PureComponent } from 'react';
// ANIMATIONS
import { TransitionGroup, CSSTransition } from 'react-transition-group';
// STYLE
import './App.css';
// COMPONENTS
import Header from './Header';
import Movie from './Movie';
import MovieForm from './MovieForm';
import MovieFocus from './MovieFocus';
// BDD Firebase
import base from '../base';


class App extends PureComponent {

  state = {
    movies: {},
    showMovieFocus: false,
    searchText: null,
    posterFocus: '',
    titleFocus: '',
    actorsFocus: '',
    genreFocus: '',
    yearFocus: '',
    awardsFocus: '',
    writerFocus: '',
    plotFocus: '',
    ratingsFocus: '',
  }

  // Synchro with firebase
  componentWillMount() {
    this.ref = base.syncState(`${this.props.match.params.pseudo}/movies`, {
      context: this,
      state: 'movies',
    });
  }
  // Desynchro with firebase
  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  addMovie = (movie) => {
    const movies = { ...this.state.movies };
    const timestamp = Date.now();
    movies[`movie-${timestamp}`] = movie;
    this.setState({ searchText: null });
    this.setState({ movies });
  }

  deleteMovie = (id) => {
    const movies = { ...this.state.movies };
    movies[id] = null;
    this.setState({ movies });
  }

  // Unused for now
  deleteAll = () => { this.setState({ movies: null }); }

  clickMovie = (id) => {
    const movies = { ...this.state.movies };
    this.setState({
      posterFocus: movies[id].poster, titleFocus: movies[id].title, actorsFocus: movies[id].actors, genreFocus: movies[id].genre, yearFocus: movies[id].year, awardsFocus: movies[id].awards, writerFocus: movies[id].writer, plotFocus: movies[id].plot, ratingsFocus: movies[id].ratings,
    });
    this.state.showMovieFocus === false ? this.setState({ showMovieFocus: true }) : this.setState({ showMovieFocus: false });
  }

//Unused ATM
  /*closeMovieFocus = () => {
    this.setState({ showMovieFocus: false });
  }*/

  render() {
    const { movies } = this.state;


    let filteredMovies = Object.keys(movies).reverse();
    if (this.state.searchText !== null && this.state.searchText.length >= 3) {
      filteredMovies = Object
        .keys(movies)
        .reverse()
        .filter(movieKey => movies[movieKey].title.toLowerCase().includes(this.state.searchText));
    }

    const movieList = filteredMovies
      .map(key =>
        (<CSSTransition key={key} timeout={500} classNames="fade">
          <Movie
            key={key}
            id={key}
            poster={movies[key].poster}
            title={movies[key].title}
            actors={movies[key].actors}
            genre={movies[key].genre}
            year={movies[key].year}
            awards={movies[key].awards}
            writer={movies[key].writer}
            plot={movies[key].plot}
            ratings={movies[key].ratings}
            deleteMovie={this.deleteMovie}
            handleClick={this.clickMovie}/>
         </CSSTransition>
        ));

    return (

      <div className="App">
        <Header pseudo={this.props.match.params.pseudo} onChange={value => this.setState({ searchText: value })}/>
        <TransitionGroup className="grid">
          <MovieForm createMovie={this.props.createMovie} addMovie={this.addMovie} />
          {movieList}
        </TransitionGroup>
        <CSSTransition in={this.state.showMovieFocus === true} timeout={500} classNames="fade">
          <React.Fragment>
            {this.state.showMovieFocus ?
              <MovieFocus
                poster={this.state.posterFocus}
                title={this.state.titleFocus}
                actors={this.state.actorsFocus}
                genre={this.state.genreFocus}
                year={this.state.yearFocus}
                awards={this.state.awardsFocus}
                writer={this.state.writerFocus}
                plot={this.state.plotFocus}
                ratings={this.state.ratingsFocus}
              /> : null}
          </React.Fragment>
        </CSSTransition>
      </div>
    );
  }
}

export default App;

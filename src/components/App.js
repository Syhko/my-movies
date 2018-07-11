// REACT
import React, { PureComponent } from 'react';
// ANIMATIONS
import { TransitionGroup, CSSTransition } from 'react-transition-group';
// STYLE
import './App.css';
// COMPONENTS
import Header from './Header';
import Movie from './Movie';
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
    genreFocus: '',
    dateFocus: '',
    plotFocus: '',
    ratingsFocus: '',
    hasBeenSeen: 'hasBeenSeenHidden',
    showDeleteMovie: 'showDeleteMovieHidden',
    triggerButtonState: 'editTriggerButton',
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
    let isPresent = Object.values(movies).find(x => x.imdbId === movie.imdbId);
    if (isPresent === undefined) {
      const timestamp = Date.now();
      movies[`movie-${timestamp}`] = movie;
      this.setState({ searchText: null });
      this.setState({ movies });
    } else {
      alert('this movie already exist');
    }

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
      posterFocus: movies[id].poster,
      titleFocus: movies[id].title,
      genreFocus: movies[id].genre,
      dateFocus: movies[id].date,
      plotFocus: movies[id].plot,
      ratingsFocus: movies[id].ratings,
    });
    this.state.showMovieFocus === false ? this.setState({ showMovieFocus: true }) : this.setState({ showMovieFocus: false });
  }

  triggerEdit = () => {
    this.state.hasBeenSeen === 'hasBeenSeenHidden' ?
    this.setState({ hasBeenSeen : 'hasBeenSeen', showDeleteMovie : 'showDeleteMovie', triggerButtonState: 'editTriggerButtonExit' }) :
    this.setState({ hasBeenSeen : 'hasBeenSeenHidden', showDeleteMovie : 'showDeleteMovieHidden', triggerButtonState: 'editTriggerButton' });
  }

  isMovieSeen = (id) => {
    console.log("ok");
  }

  closeMovieFocus = () => {
    this.setState({ showMovieFocus: false });
  }

  render() {
    const { movies, searchText, showDeleteMovie, hasBeenSeen, triggerButtonState, showMovieFocus, titleFocus, genreFocus, dateFocus, plotFocus, ratingsFocus } = this.state;

    let filteredMovies = Object.keys(movies).reverse();
    if (searchText !== null && searchText.length >= 3) {
      filteredMovies = Object
        .keys(movies)
        .reverse()
        .filter(movieKey => movies[movieKey].title.toLowerCase().includes(searchText));
    }

    const movieList = filteredMovies
      .map(key =>
        (<CSSTransition key={key} timeout={500} classNames="fade">
          <Movie
            key={key}
            id={key}
            ficheType={"clickableFiche"}
            posterType={"posterUnSeen"}
            showDeleteMovie={showDeleteMovie}
            hasBeenSeen={hasBeenSeen}
            poster={"http://image.tmdb.org/t/p/w185/"+movies[key].poster}
            title={movies[key].title}
            genre={movies[key].genre}
            date={movies[key].date}
            plot={movies[key].plot}
            ratings={movies[key].ratings}
            imdbId={movies[key].imdbId}
            deleteMovie={this.deleteMovie}
            handleClick={this.clickMovie}
            isMovieSeen={this.isMovieSeen}/>
         </CSSTransition>
        ));

    return (

      <div className="App">
        <Header createMovie={this.props.createMovie} addMovie={this.addMovie} pseudo={this.props.match.params.pseudo} onChange={value => this.setState({ searchText: value })}/>
        <button className={triggerButtonState} onClick={this.triggerEdit}>{hasBeenSeen === 'hasBeenSeenHidden' ? 'Edit' : 'Quit editing'}</button>
        <TransitionGroup className="grid">
          {movieList}
        </TransitionGroup>
        <CSSTransition in={showMovieFocus === true} timeout={500} classNames="fade">
          <React.Fragment>
            {this.state.showMovieFocus ?
              <MovieFocus
                poster={"http://image.tmdb.org/t/p/w185/"+this.state.posterFocus}
                title={this.state.titleFocus}
                genre={this.state.genreFocus}
                date={this.state.dateFocus}
                plot={this.state.plotFocus}
                ratings={this.state.ratingsFocus}
                closeMovieFocus={this.closeMovieFocus}
              /> : null}
          </React.Fragment>
        </CSSTransition>
      </div>
    );
  }
}

export default App;

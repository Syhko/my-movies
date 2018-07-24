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

import { auth } from '../client';


class App extends PureComponent {
  state = {
    movies: {},
    isSeenCheckBoxes: {},
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
    user: '',
  }

  // Synchro with firebase
  componentWillMount() {
    const user = auth().currentUser;
    if (user) {
      this.setState({ user: user.uid });
    } else {
      this.setState({ user: this.props.match.params.uid });
    }
  }
  componentDidMount() {
    base.syncState(`${this.state.user}/isSeenCheckBoxes`, {
      context: this,
      state: 'isSeenCheckBoxes',
    });
    base.syncState(`${this.state.user}/movies`, {
      context: this,
      state: 'movies',
    });
  }

  addMovie = (movie, isSeenCheckBox) => {
    const movies = { ...this.state.movies };
    const isSeenCheckBoxes = { ...this.state.isSeenCheckBoxes };
    const isPresent = Object.values(movies).find(x => x.imdbId === movie.imdbId);
    if (isPresent === undefined) {
      const timestamp = Date.now();
      movies[`${timestamp}`] = movie;
      isSeenCheckBoxes[`${timestamp}`] = isSeenCheckBox;
      this.setState({ searchText: null });
      this.setState({ movies, isSeenCheckBoxes });
    } else {
      alert('this movie already exist');
    }
  }

  deleteMovie = (id) => {
    const movies = { ...this.state.movies };
    const isSeenCheckBoxes = { ...this.state.isSeenCheckBoxes };
    movies[id] = null;
    this.setState({ movies });
    isSeenCheckBoxes[id] = null;
    this.setState({ isSeenCheckBoxes });
  }

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
    this.setState({ hasBeenSeen : 'hasBeenSeen', showDeleteMovie : 'showDeleteMovie', triggerButtonState: 'editTriggerButtonExit' }):
    this.setState({ hasBeenSeen : 'hasBeenSeenHidden', showDeleteMovie : 'showDeleteMovieHidden', triggerButtonState: 'editTriggerButton' });
  }

  isMovieSeen = (id) => {
    const movies = { ...this.state.movies}
    const isSeenCheckBoxes = { ...this.state.isSeenCheckBoxes}
    isSeenCheckBoxes[id].isSeen === false ? isSeenCheckBoxes[id].isSeen = true : isSeenCheckBoxes[id].isSeen = false;
    movies[id].isSeen === 'posterUnSeen' ? movies[id].isSeen = 'posterSeen' : movies[id].isSeen = 'posterUnSeen';
    this.setState({ isSeenCheckBoxes })
    this.forceUpdate();
  }

  closeMovieFocus = () => {
    this.setState({ showMovieFocus: false });
  }

  render() {
    const {
      movies,
      isSeenCheckBoxes,
      searchText,
      showDeleteMovie,
      hasBeenSeen,
      triggerButtonState,
      showMovieFocus,
      titleFocus,
      genreFocus,
      dateFocus,
      plotFocus,
      ratingsFocus,
    } = this.state;

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
            posterType={isSeenCheckBoxes[key].isSeen === true ? "posterSeen" : "posterUnSeen" }
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
            isMovieSeen={this.isMovieSeen}
            isChecked={isSeenCheckBoxes[key].isSeen}/>
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
            {showMovieFocus ?
              <MovieFocus
                poster={"http://image.tmdb.org/t/p/w185/"+this.state.posterFocus}
                title={titleFocus}
                genre={genreFocus}
                date={dateFocus}
                plot={plotFocus}
                ratings={ratingsFocus}
                closeMovieFocus={this.closeMovieFocus}
              /> : null}
          </React.Fragment>
        </CSSTransition>
      </div>
    );
  }
}

export default App;

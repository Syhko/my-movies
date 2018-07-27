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
// REACT SORTABLE
import { SortableContainer, SortableElement, arrayMove } from 'react-sortable-hoc';

const POSTER_PATH = 'http://image.tmdb.org/t/p/w185';

class App extends PureComponent {
  state = {
    movies: [],
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
      this.setState({ user: null });
    }
  }
  componentDidMount() {
    base.syncState(`${this.state.user}/movies`, {
      context: this,
      state: 'movies',
      asArray: true
    });
  }

  deleteMovie = (index) => {
    const movies = [...this.state.movies];
    movies.splice(index, 1);
    this.setState({ movies });
  }

  clickMovie = (index) => {
    this.setState({
      posterFocus: this.state.movies[index].poster,
      titleFocus: this.state.movies[index].title,
      genreFocus: this.state.movies[index].genre,
      dateFocus: this.state.movies[index].date,
      plotFocus: this.state.movies[index].plot,
      ratingsFocus: this.state.movies[index].ratings,
    });
    this.state.showMovieFocus === false ?
    this.setState({ showMovieFocus: true }) :
    this.setState({ showMovieFocus: false });
  }

  triggerEdit = () => {
    this.state.hasBeenSeen === 'hasBeenSeenHidden' ?
    this.setState({ hasBeenSeen : 'hasBeenSeen', showDeleteMovie : 'showDeleteMovie', triggerButtonState: 'editTriggerButtonExit' }):
    this.setState({ hasBeenSeen : 'hasBeenSeenHidden', showDeleteMovie : 'showDeleteMovieHidden', triggerButtonState: 'editTriggerButton' });
  }

  isMovieSeen = (id) => {
    const movies = { ...this.state.movies}
    movies[id].isSeen === false ? movies[id].isSeen = true : movies[id].isSeen = false;
    this.setState({ movies })
  }

  closeMovieFocus = () => {
    this.setState({ showMovieFocus: false });
  }

  onSortEnd = ({oldIndex, newIndex}) => {
    this.setState(prevState => ({
      movies: arrayMove(prevState.movies, oldIndex, newIndex),
    }));
  };

  addMovie = (movie) => {
    const movies = [...this.state.movies];
    const isPresent = Object.values(this.state.movies).find(x => x.imdbId === movie.imdbId);
    if (isPresent === undefined) {
      movies.push(movie);
      this.setState({ movies });
    } else {
      alert('this movie already exist');
    }
  }

  render() {
    const {
      user,
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

    const DraggableMovie = SortableElement(({ key, ...props }) =>
      <Movie key={key} {...props} />
    )

    const movieList = Object
      .keys(movies)
      .map(key =>
        (
          <DraggableMovie
            index={parseInt(key)}
            sortIndex={key}
            key={key}
            id={key}
            ficheType={"clickableFiche"}
            posterType={movies[key].isSeen === true ? "posterSeen" : "posterUnSeen" }
            showDeleteMovie={showDeleteMovie}
            hasBeenSeen={hasBeenSeen}
            poster={`${POSTER_PATH}`+movies[key].poster}
            title={movies[key].title}
            genre={movies[key].genre}
            date={movies[key].date}
            plot={movies[key].plot}
            ratings={movies[key].ratings}
            imdbId={movies[key].imdbId}
            deleteMovie={this.deleteMovie}
            handleClick={this.clickMovie}
            isMovieSeen={this.isMovieSeen}
            isChecked={movies[key].isSeen}
          />
        ));

    const DraggableList = SortableContainer(movies => (
      <div className="grid">
        {movieList}
      </div>
    ));

    return (

      <div className="App">
        {!user && <p className="message_unlogged">You are not correctly logged or this is not your account</p>}
        <Header
          createMovie={this.props.createMovie}
          addMovie={this.addMovie}
          pseudo={this.props.match.params.pseudo}
        />
        <button className={triggerButtonState} onClick={this.triggerEdit}>{hasBeenSeen === 'hasBeenSeenHidden' ? 'Edit' : 'Quit editing'}</button>
        <DraggableList
          axis={"xy"}
          pressDelay={100}
          movies={movies}
          onSortEnd={this.onSortEnd}
          transitionDuration={700}
          useWindowAsScrollContainer={true}
        />
        <CSSTransition in={showMovieFocus === true} timeout={500} classNames="fade">
          <React.Fragment>
            {showMovieFocus ?
              <MovieFocus
                poster={'http://image.tmdb.org/t/p/w185'+this.state.posterFocus}
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

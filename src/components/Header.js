// REACT ROUTER
import { Link } from 'react-router-dom';
// REACT
import React from 'react';
// COMPONENTS
import Autosuggest from 'react-autosuggest';
// STYLE
import './Header.css';
// CONSTANTS
const BASE_API_PATH = 'https://api.themoviedb.org/3';
const API_KEY = '83429be555fee4df5b40acab7217acf8';

class Header extends React.Component {
  state = {
    poster: '',
    title: '',
    date: '',
    genre: '',
    plot: '',
    ratings: '',
    imdbId: '',
    value: '',
    listMovies: [],
    suggestions: [],
  };

  onChange = (event, { newValue }) => {
    this.setState({ value: newValue });
    this.requestFetchSuggestion();
  };

  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: this.getSuggestions(value),
    });
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: [],
    });
  };

  onSuggestionSelected = async (event, { suggestionValue }) => {
    const currentComponent = this;
    await this.setState ({ matchingValue: suggestionValue });
    const selectedId = this.state.listMovies.filter(x => x.title === this.state.value)[0].id;
    await fetch(`${BASE_API_PATH}/movie/${selectedId}?api_key=${API_KEY}&language=en-US`)
      .then(response => response.json())
      .then((data) => {
        const poster = data.poster_path;
        const { title } = data;
        const date = data.release_date;
        const genre = data.genres[0].name;
        const plot = data.overview;
        const ratings = data.vote_average;
        const imdbId = data.imdb_id;
        const id= Date.now();

        return currentComponent.setState({ id, poster, title, date, genre, plot, ratings, imdbId }
          , () => true);
      })
    const movie = {
      id: this.state.id,
      poster: this.state.poster,
      title: this.state.title,
      date: this.state.date,
      genre: this.state.genre,
      plot: this.state.plot,
      ratings: this.state.ratings,
      imdbId: this.state.imdbId,
      isSeen: false,
    };
    /*const isSeenCheckBox = {
      isSeen: false
    };*/
    this.props.addMovie(movie/*, isSeenCheckBox*/);
    await this.addForm.reset();
    await this.setState({ value: '' });
  }

  getSuggestionValue = suggestion => suggestion.title;

  getSuggestions = (value) => {
    return this.state.listMovies === undefined ? [] : this.state.listMovies.slice(0, 10);
  };

  requestFetchSuggestion = () => {
    const currentComponent = this;

    fetch(`${BASE_API_PATH}/search/movie?api_key=${API_KEY}&language=en-US&query=${this.state.value}&page=1&include_adult=false`)
      .then(response => response.json())
      .then((data) => {
        const dataArray = data.results;
        return currentComponent.setState({ listMovies: dataArray })
      });
  }

  renderSuggestion = suggestion => (
    <div>
      {suggestion.title}
    </div>
  );

  render() {

    const { onChange, pseudo } = this.props;
    const { value, suggestions } = this.state;
    const inputProps = {
      placeholder: 'Search',
      value,
      type: 'search',
      onChange: this.onChange
    }


    return (
      <header className="bandeau">
        <h1 className="titleText">Hi there !</h1>
        <form className="addForm" ref={input => this.addForm = input}>
          <Autosuggest
            suggestions={suggestions}
            onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
            onSuggestionsClearRequested={this.onSuggestionsClearRequested}
            getSuggestionValue={this.getSuggestionValue}
            renderSuggestion={this.renderSuggestion}
            inputProps={inputProps}
            onSuggestionSelected={this.onSuggestionSelected}
          />
        </form>
        <Link to="/" className="link"><button className="homeButton">Home</button></Link>
      </header>
    );
  }
}

export default Header;

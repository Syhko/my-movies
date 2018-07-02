import { Link } from 'react-router-dom';
import Autosuggest from 'react-autosuggest';
import React from 'react';
import './Header.css';


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
      suggestions: []
    });
  };

  onSuggestionSelected = async (event, { suggestionValue }) => {
    const currentComponent = this;
    await this.setState ({ matchingValue: suggestionValue });
    const selectedId = this.state.listMovies.filter(x => x.title === this.state.value)[0].id;
    await fetch(`https://api.themoviedb.org/3/movie/${selectedId}?api_key=83429be555fee4df5b40acab7217acf8&language=en-US`)
      .then(response => response.json())
      .then((data) => {
        const poster = data.poster_path;
        const title = data.title;
        const date = data.release_date;
        const genre = data.genres[0].name;
        const plot = data.overview;
        const ratings = data.vote_average;
        const imdbId = data.imdb_id;

          return currentComponent.setState({ poster, title, date, genre, plot, ratings, imdbId }
        ,() => true);
      })
    const movie = {
      poster: this.state.poster,
      title: this.state.title,
      date: this.state.date,
      genre: this.state.genre,
      plot: this.state.plot,
      ratings: this.state.ratings,
      imdbId: this.state.imdbId
    };
    if (movie.poster === 'N/A') {
      alert('NO IMAGE FOUND');
      return false;
    }
    this.props.addMovie(movie);
    await this.addForm.reset();
    await this.setState({ value: '' });
  }

  getSuggestionValue = suggestion => suggestion.title

  getSuggestions = (value) => {
    return this.state.listMovies === undefined ? [] : this.state.listMovies.slice(0, 10);
  };

  requestFetchSuggestion = () => {
    const currentComponent = this;

    fetch(`https://api.themoviedb.org/3/search/movie?api_key=83429be555fee4df5b40acab7217acf8&language=en-US&query=${this.state.value}&page=1&include_adult=false`)
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
      placeholder: 'Search...',
      value,
      type: 'search',
      onChange: this.onChange
    }


    return (
      <header className="bandeau">
        <h1 className="titleText">{pseudo.charAt(0).toUpperCase()+pseudo.slice(1)} </h1>
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

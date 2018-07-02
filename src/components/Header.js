import { Link } from 'react-router-dom';
import Autosuggest from 'react-autosuggest';
import React from 'react';
import './Header.css';


class Header extends React.Component {
  state = {
    poster: '',
    title: '',
    actors: '',
    year: '',
    genre: '',
    awards: '',
    writer: '',
    plot: '',
    ratings: '',
    imdbID: '',
    value: '',
    matchingValue: '',
    listMovies: [],
    suggestions: [],
  };

  onChange = (event, { newValue }) => {
    this.setState({ value : newValue });
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

  getSuggestionValue = suggestion => suggestion.title

  getSuggestions = (value) => {
    const inputValue = value.toLowerCase();
    const inputLength = inputValue.length;

    return this.state.listMovies === undefined ? [] : this.state.listMovies.slice(0, 10);
  };

  createMovie = async (event) => {
    event.preventDefault();
    await this.requestFetch();
    const movie = {
      poster: this.state.poster,
      title: this.state.title,
      actors: this.state.actors,
      year: this.state.year,
      genre: this.state.genre,
      awards: this.state.awards,
      writer: this.state.writer,
      plot: this.state.plot,
      ratings: this.state.ratings,
      imdbID: this.state.imdbID,
    };
    if (movie.poster === 'N/A') {
      alert('NO IMAGE FOUND');
      return false;
    }
    this.props.addMovie(movie);
    this.addForm.reset();
    this.setState({ value : '' });
  }

  requestFetchSuggestion = () => {
    const currentComponent = this;

    fetch(`https://api.themoviedb.org/3/search/movie?api_key=83429be555fee4df5b40acab7217acf8&language=en-US&query=${this.state.value}&page=1&include_adult=false`)
      .then(response => response.json())
      .then((data) => {
        const dataArray = data.results;
        return currentComponent.setState ({ listMovies : dataArray })
      });

  }

  requestFetch = () => {
    const currentComponent = this;

    return fetch(`https://www.omdbapi.com/?apikey=ffc03c92&t=${this.state.value}`)
      .then(response => response.json())
      .then((data) => {
        const title = data.Title;
        const poster = data.Poster;
        const actors = data.Actors;
        const year = data.Year;
        const genre = data.Genre;
        const awards = data.Awards;
        const writer = data.Writer;
        const plot = data.Plot;
        const ratings = data.Ratings;
        const imdbID = data.imdbID;


        return currentComponent.setState({
          poster, title, actors, year, genre, awards, writer, plot, ratings, imdbID,
        }, () => true);
      });
  }

  renderSuggestion = suggestion => (
      <div>
        {suggestion.title}
      </div>
  );

  onSuggestionSelected = async (event, { suggestionValue }) => {
    await this.setState ({ matchingValue : suggestionValue });
    const selectedId = this.state.listMovies.filter(x => x.title === this.state.value)[0].id;
    fetch(`https://api.themoviedb.org/3/movie/${selectedId}?api_key=83429be555fee4df5b40acab7217acf8&language=en-US`)
      .then(response => response.json())
        .then((data) => {
          console.log(data);
        })
  }

  newFetch = () => {
    fetch(`https://api.themoviedb.org/3/search/movie?api_key=83429be555fee4df5b40acab7217acf8&language=en-US&query=${"___"}&page=1&include_adult=false`)
    .then(response => response.json())
      .then((data) => {
        console.log(data);
      });
  }

  render() {

    const { onChange, pseudo } = this.props;
    const { value, suggestions } = this.state;
    const inputProps = {
      placeholder: 'Search a movie',
      value,
      type: 'search',
      onChange: this.onChange
    }


    return (
      <header className="bandeau">
        <button onClick={this.newFetch}>TEST</button>
        <h1 className="titleText">Welcome {pseudo.charAt(0).toUpperCase()+pseudo.slice(1)} </h1>
        <form className="addForm" ref={input => this.addForm = input} onSubmit={e => this.createMovie(e)} >
          <Autosuggest
            suggestions={suggestions}
            onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
            onSuggestionsClearRequested={this.onSuggestionsClearRequested}
            getSuggestionValue={this.getSuggestionValue}
            renderSuggestion={this.renderSuggestion}
            inputProps={inputProps}
            onSuggestionSelected={this.onSuggestionSelected}
          />
          {/*<button type="submit" className="addButton">Add</button>*/}
        </form>
        {/*<input className="searchInput" type="text" placeholder="Search..." onChange={e => onChange(e.target.value)} />*/}
        <Link to="/"><button className="homeButton" /* onClick={this.props.deleteAll} */ >Return to Login Page</button></Link>
      </header>
    );
  }
}

export default Header;

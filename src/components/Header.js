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
    listMovies: [],
    suggestions: [],
  };

  onChange = (event, { newValue }) => {
    this.requestFetchSuggestion();
    this.setState({
      value: newValue,
    });
  };

  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: this.getSuggestions(value)
    });
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  getSuggestionValue = suggestion => suggestion.Title

  getSuggestions = (value) => {
    const inputValue = value.toLowerCase();
    const inputLength = inputValue.length;

    return this.state.listMovies !== [] && inputLength === 0 ? [] : this.state.listMovies.filter(list =>
      list.Title.toLowerCase().slice(0, inputLength) === inputValue);
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

    fetch(`https://www.omdbapi.com/?apikey=ffc03c92&s=${this.state.value}`)
    .then(response => response.json())
    .then((data) => {
      if (data.Response !== "False") {
        console.log(data);
        const dataArray=Object.values(data).slice(0,1);
      return currentComponent.setState ({ listMovies : dataArray[0] })
    }
      })

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
        {suggestion.Title} {suggestion.Year}
      </div>
  );

  render() {

    const { onChange, pseudo } = this.props;
    const { value, suggestions } = this.state;
    const inputProps = {
      placeholder: 'Search a movie',
      value,
      onChange: this.onChange
    }


    return (
      <header className="bandeau">
        <h1 className="titleText">Welcome {pseudo.charAt(0).toUpperCase()+pseudo.slice(1)} </h1>
        <form className="addForm" ref={input => this.addForm = input} onSubmit={e => this.createMovie(e)} >
          <Autosuggest
            suggestions={suggestions}
            onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
            onSuggestionsClearRequested={this.onSuggestionsClearRequested}
            getSuggestionValue={this.getSuggestionValue}
            renderSuggestion={this.renderSuggestion}
            inputProps={inputProps}
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

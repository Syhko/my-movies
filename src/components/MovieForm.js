import React, { Component } from 'react';
import Autosuggest from 'react-autosuggest';
import './MovieForm.css';

class MovieForm extends React.Component {

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
    value: '',
    listMovies: [],
    suggestions: []
  }

  onChange = (event, { newValue }) => {
    this.setState({
      value: newValue
    });
    this.requestFetchSuggestion();
  };

  getSuggestions = (value) => {
    const inputValue = value.toLowerCase();
    const inputLength = inputValue.length;

    return this.state.listMovies[0] !== [] && inputLength === 0 ? [] : this.state.listMovies.filter(list =>
      list.Title.toLowerCase().slice(0, inputLength) === inputValue
    );
  };

  getSuggestionValue = (suggestion) => {
    return suggestion.Title;
  }

  renderSuggestion = (suggestion) => {
    return (
      <div>
        {suggestion.Title}
      </div>
    );
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
    };
    if (movie.poster === 'N/A') {
      alert('NO IMAGE FOUND');
      return false;
    }
    this.props.addMovie(movie);
    this.addForm.reset();
  }

  requestFetchSuggestion = () => {
    const currentComponent = this;

    this.state.value.length>=3 && fetch(`https://www.omdbapi.com/?apikey=ffc03c92&s=${this.state.value}`)
    .then(response => response.json())
    .then((data) => {
      if (data.Response !== "False") {
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

        return currentComponent.setState({
          poster, title, actors, year, genre, awards, writer, plot, ratings,
        }, () => true);
      });
  }

  render() {
    const { value, suggestions } = this.state;
    const inputProps = {
      placeholder: 'Search a movie',
      value,
      onChange: this.onChange
    };
    console.log(this.state.suggestions);

    return (
      <div className="ficheForm">
        <form className="addForm" ref={input => this.addForm = input} onSubmit={e => this.createMovie(e)} >
          <h1>HERE</h1>
          <p> ADD A MOVIE/SERIE TO YOUR DATABASE </p>
          <Autosuggest
            suggestions={suggestions}
            onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
            onSuggestionsClearRequested={this.onSuggestionsClearRequested}
            getSuggestionValue={this.getSuggestionValue}
            renderSuggestion={this.renderSuggestion}
            inputProps={inputProps}
          />
          <button type="submit" className="addButton">Add</button>
          <p>(Click on a movie to see details)</p>
        </form>
      </div>
    );
  }
}


export default MovieForm;

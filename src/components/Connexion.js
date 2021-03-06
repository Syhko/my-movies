// REACT
import React, { PureComponent } from 'react';
// ROUTER
import { Link } from 'react-router-dom';
// CSS
import './Connexion.css';
import logo_Syhko from './logo_Syhko.png';
import logo_tmdb from './logo_tmdb.png';
// COMPONENTS
import Movie from './Movie';

// CONSTANTS
const BASE_API_PATH = 'https://api.themoviedb.org/3';
const API_KEY = '83429be555fee4df5b40acab7217acf8';

class Connexion extends PureComponent {
  state={
    pseudo: '',
    newMoviesPosters : ''
  }

  componentWillMount() {
    fetch(`${BASE_API_PATH}/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1`)
  //  fetch(`${BASE_API_PATH}/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=true&include_video=true&page=1`)
      .then((response) => {
        if (response.status !== 200) {
          console.log(`Error: ${response.status}`);
          return;
        }

        response.json()
          .then((data) => {
            const newMoviesPosters = data.results.map(x => x.poster_path);
            this.setState({ newMoviesPosters});
          });
      })
}

  updatePseudo = (e) => {
    this.setState({ pseudo: e.target.value });
  }

  checkPseudo = (e) => {
    if (!this.state.pseudo.match(/^[^\W_]{3,10}$/)) {
      e.preventDefault();
      alert('Enter a valid pseudo');
    }
  }

  render() {
    const { pseudo, newMoviesPosters } = this.state;

    const newMovieList = Object.keys(newMoviesPosters)
      .map(key =>
        (<Movie
          key={key}
          id={key}
          ficheType={"noClickableFiche"}
          posterType={"posterNeutral"}
          showDeleteMovie={"showDeleteMovieHidden"}
          hasBeenSeen={"hasBeenSeenHidden"}
          poster={"http://image.tmdb.org/t/p/w185/"+newMoviesPosters[key]}/>
        ));

    return (
      <div className="component_connexion_wrapper">
        <img className="logo_tmdb" width="204" height="80" src={logo_tmdb}/>
        <form className="connexion_wrapper">
          <img src={logo_Syhko} width="400" height="216" alt="logo_Syhko"/>
          <h1 className="connexion_title">Syhko Movie App</h1>
          <input
            className="connexion_input"
            type="text"
            placeholder="Enter your pseudo*"
            required
            onChange={this.updatePseudo}
          />
          <p>*(Only letters and digits, min 3, max 10)</p>
          <Link to={`/movies/${pseudo.trim().toLowerCase()}`} onClick={this.checkPseudo}>
            <button className="connexion_button">
              Connect !
            </button>
          </Link>
        </form>
        <div className="newMovieswrapper">
          <h1 className="newMovies_title">News and upcomings</h1>
          <div className="newMoviesGrid">
            {newMovieList}
          </div>
        </div>
      </div>

    );
  }
}

export default Connexion;

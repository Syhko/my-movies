// REACT
import React, { PureComponent } from 'react';
// FIREBASE
import firebase from 'firebase';
// FIREBASE COMPONENTS
import { facebookProvider, auth } from '../client';
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
    newMoviesPosters: '',
    user: null,
  }

  componentWillMount() {
    fetch(`${BASE_API_PATH}/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1`)
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

  componentDidMount() {
    auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ user })
      }
    })
  }

login = () => {
  auth().signInWithPopup(facebookProvider)
    .then(({ user }) => {
      this.setState({ user });
    })
    console.log(this.state.user);
}

logout = () => {
  auth().signOut().then(() => {
    this.setState({user : null});
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
    const { pseudo, newMoviesPosters, user } = this.state;

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
        <div className="connexion_wrapper">
          <img src={logo_Syhko} width="400" height="216" alt="logo_Syhko"/>
          <h1 className="connexion_title">Syhko Movie App</h1>


          {!user && <button
                      onClick={this.login}
                      className="facebook_connexion_button">
                      Connect with Facebook
                    </button>}
          {user && <p className="user_displayname">Welcome {user.displayName} !</p>}
          {user && <Link to={`/movies/${user.uid}`}>
                      <button className="connexion_button_Facebook">
                        GO !
                      </button>
                    </Link>}
          {user && <button
                      onClick={this.logout}
                      className="disconnect_button">
                      Disconnect
                    </button>}
          {!user && <p>OR</p>}
          {!user && <div className="pseudo_wrapper">
                      <input
                      className="connexion_input"
                      type="text"
                      placeholder="Enter your pseudo*"
                      required
                      onChange={this.updatePseudo}
                      />
                      <Link to={`/movies/${pseudo.trim().toLowerCase()}`} onClick={this.checkPseudo}>
                        <button className="connexion_button">
                          Go !
                        </button>
                      </Link>
                    </div>}
          {!user && <p>*(Only letters and digits, min 3, max 10)</p>}
        </div>
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

// REACT
import React, { PureComponent } from 'react';
// FIREBASE
import firebase from 'firebase';
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
    password: '',
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

loginFacebook = () => {
  auth().signInWithPopup(facebookProvider)
    .then(({ user }) => {
      this.setState({ user }, () => console.log(this.state.user));
    });
}

signUpAccount = () => {
  auth().createUserWithEmailAndPassword(this.state.pseudo, this.state.password).catch((error) => {
    let errorCode = error.code;
    let errorMessage = error.message;
    alert(errorMessage);
  });
}

loginAccount = () => {
  auth().signInWithEmailAndPassword(this.state.pseudo, this.state.password).catch((error) => {
    let errorCode = error.code;
    let errorMessage = error.message;
    alert(errorMessage);
  });
}

logout = () => {
  auth().signOut().then(() => {
    this.setState({user : null});
  })
}

  updatePseudo = (e) => {
    this.setState({ pseudo: e.target.value });
  }

  updatePassword = (e) => {
    this.setState({ password: e.target.value });
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
                      onClick={this.loginFacebook}
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
          {!user && <form className="pseudo_wrapper">
                      <input
                      className="connexion_input"
                      type="text"
                      placeholder="Email"
                      required
                      onChange={this.updatePseudo}
                      />
                      <input
                      className="connexion_input"
                      type="password"
                      placeholder="Password"
                      required
                      onChange={this.updatePassword}
                      />
                      <div className="button_login_wrapper">
                        <button type="button" className="connexion_button" onClick={this.signUpAccount}>Sign up</button>
                        <button type="button" className="connexion_button" onClick={this.loginAccount}>Sign in</button>
                      </div>
                    </form>}
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

// REACT
import React, { PureComponent } from 'react';
// ROUTER
import { Link } from 'react-router-dom';
// CSS
import './Connexion.css';

class Connexion extends PureComponent {
  state={
    pseudo: 'a',
  }

  updatePseudo = (e) => {
    this.setState({ pseudo: e.target.value });
  }

  goToMovies = (event) => {
    event.preventDefault();
  }

  render() {
    return (
      <form className="connexion_wrapper" onSubmit={e => this.goToMovies(e)} >
        <h1 className="connexion_title">Syhko Movie App</h1>
        <input
          className="connexion_input"
          type="text"
          placeholder="Enter your pseudo"
          required
          onChange={this.updatePseudo}
        />
        <Link to={`/movies/${this.state.pseudo.toLowerCase()}`}><button className="connexion_button">Connect !</button></Link>
      </form>

    );
  }
}

export default Connexion;

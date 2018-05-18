// REACT
import React, { PureComponent } from 'react';
import { BrowserRouter as Link } from 'react-router-dom';
// CSS
import '../App.css';

class Connexion extends PureComponent {
  state={
    pseudo: '',
  }

  updatePseudo = (e) => {
    this.setState({ pseudo: e.target.value });
  }

  render() {
    return (
      <div className="connexion_wrapper">
        <h1 className="connexion_title">Syhko Movie App</h1>
        <input
          className="connexion_input"
          type="text"
          placeholder="Enter your pseudo"
          required
          onChange={this.updatePseudo}
        />
        <a href={`/movies/${this.state.pseudo}`}><button className="connexion_button">Connect !</button></a>
      </div>
    );
  }
}

export default Connexion;

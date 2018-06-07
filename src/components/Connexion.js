// REACT
import React, { PureComponent } from 'react';
// ROUTER
import { Link } from 'react-router-dom';
// CSS
import './Connexion.css';
import logo_Syhko from './logo_Syhko.png';

class Connexion extends PureComponent {
  state={
    pseudo: '',
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
    const { pseudo } = this.state;
    return (
      <form className="connexion_wrapper">
        <img src={logo_Syhko} alt="logo_Syhko"/>
        <h1 className="connexion_title">Syhko Movie App</h1>
        <input
          className="connexion_input"
          type="text"
          placeholder="Enter your pseudo*"
          required
          onChange={this.updatePseudo}
        />
        <p>*(Only letters and digits, minimum 3 characters, maximum 10)</p>
        <Link to={`/movies/${pseudo.trim().toLowerCase()}`} onClick={this.checkPseudo}>
          <button className="connexion_button">
            Connect !
          </button>
        </Link>
      </form>

    );
  }
}

export default Connexion;

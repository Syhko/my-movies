//REACT
import React, { PureComponent } from 'react';
import '../App.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

class Connexion extends PureComponent {

  render () {
    console.log(this.pseudoInput);
    return (
      <div>
        <form className="connexion_wrapper">
          <h1 className="connexion_title">Syhko Movie App</h1>
          <input
            className="connexion_input"
            type="text" placeholder="Enter your pseudo"
            required
            ref={input => {this.pseudoInput = input}}
          />
          <Link to="/movies/"><button className="connexion_button">Connect !</button></Link>
        </form>
      </div>
    );
  }
}

export default Connexion;

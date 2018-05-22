import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';

class Header extends React.Component {
  render() {
    const { onChange } = this.props;
    return (
      <header className="bandeau">
        <h1 className="titleText">Welcome -pseudo-</h1>
        <input className="searchInput" type="text" placeholder="Search..." onChange={e => onChange(e.target.value)} />
        <Link to="/"><button className="homeButton" /* onClick={this.props.deleteAll} */ >Return Login Page</button></Link>
      </header>
    );
  }
}

export default Header;

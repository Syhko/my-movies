import { BrowserRouter as Link } from 'react-router-dom';
import React from 'react';
import './Header.css';

class Header extends React.Component {
  render() {
    const { onChange } = this.props;
    return (
      <header className="bandeau">
        <h1 className="titleText">Welcome -pseudo-</h1>
        <input className="searchInput" type="text" placeholder="Search..." onChange={e => onChange(e.target.value)} />
        <a href="/"><button className="clearButton" /* onClick={this.props.deleteAll} */ >Return Login Page</button></a>
      </header>
    );
  }
}

export default Header;

import React from 'react';
import './Header.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

class Header extends React.Component {


	render () {

		const { onChange } = this.props;

		return (

			<header className="bandeau">
				<h1 className="titleText">Welcome "pseudo will go here"</h1>
				<input className="searchInput" type="text" placeholder="Search..." onChange={e => onChange(e.target.value)} >
				</input>
				<Link to="/"><button className="clearButton" /*onClick={this.props.deleteAll}*/ >Return Homepage</button></Link>
			</header>
			);
	}
}




export default Header;

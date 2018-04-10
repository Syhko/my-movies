import React from 'react';
import './Header.css';

class Header extends React.Component {


	render () {

		const { onChange } = this.props;

		return (

			<header className="bandeau">
				<h1 className="titleText">Movie list App</h1>
				<input className="searchInput" type="text" placeholder="Search..." onChange={e => onChange(e.target.value)} >
				</input>
				<button className="clearButton" onClick={this.props.deleteAll} >
					CLEAR
				</button>				
			</header>
			);
	}
}




export default Header;
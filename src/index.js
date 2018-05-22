import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Connexion from './components/Connexion';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

ReactDOM.render(
  <Router>
    <div>
      <Route exact path="/" component={Connexion} />
      <Route path="/movies/:pseudo" render={(props) => <App {...props} />}/>
    </div>
  </Router>,
  document.getElementById('root'),
);
registerServiceWorker();

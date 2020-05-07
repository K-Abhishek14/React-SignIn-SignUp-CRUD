// import React from 'react';
// import ReactDOM from 'react-dom';
// import './index.css';
// import App from './App';
// import * as serviceWorker from './serviceWorker';

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );

// serviceWorker.unregister();


import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import LoginComponent from './components/LoginComponent';
import Dashboard from './components/Dashboard';
import  Signup  from './components/Signup';


const rootElement = document.getElementById('root');
ReactDOM.render(
		<Router>
        <Switch>   
			<Route exact path="/" component={LoginComponent} />
			<Route exact path="/login" component={LoginComponent} />
      <Route exact path="/signup" component={Signup} />
      <Route exact path="/dashboard" component={Dashboard} />
		</Switch>
		</Router>, rootElement
);

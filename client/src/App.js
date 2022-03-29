import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ToastContainer } from 'react-toastify';

// Redux
import { Provider } from 'react-redux';
import store from './store';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';

import axios from 'axios';
import RouteTree from './components/routing/RouteTree';
import PDOSpinner from './components/SharedComponents/Spinner/PDOSpinner';
import LoginPage from "./components/Login";
import RegisterPage from "./components/Register";
import { setAuthenticate, logoutAction } from './actions/auth';
import setAuthToken from './utils/setAuthToken';
axios.defaults.baseURL = process.env.REACT_APP_SERVER_BASE_URL || "http://localhost:3000";

axios.interceptors.response.use(res => res, (err) => {
  if (err.response.status === 403) {
    store.dispatch(logoutAction());
  } else {
    console.error(err);
  }
})
const App = () => {

  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    if (localStorage.getItem('token')) {
      setAuthToken(localStorage.getItem('token'))
      store.dispatch(setAuthenticate());
      setIsLoading(false);
    } else setIsLoading(false);
  }, [])

  return (
    <Provider store={store}>
      <ToastContainer />
      {
        isLoading ? (
          <div>
            <PDOSpinner />
          </div>
        ) : (
          <Router>
            <Switch>
              <Route path='/login' component={LoginPage} />
              <Route path='/register' component={RegisterPage} />
              <RouteTree />
            </Switch>
          </Router>
        )
      }
    </Provider>
  );
};

export default App;

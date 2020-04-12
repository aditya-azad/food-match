import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { GlobalStyle } from './styleComponents';
import * as actions from '../actions';
import Profile from './pages/Profile';
import MainPage from './pages/MainPage';
import SearchResults from './pages/SearchResults';
import LoginRedirect from './pages/LoginRedirect';

class App extends Component {

  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    return (
      <BrowserRouter>
        <Route exact path="/profile" component={Profile} />
        <Route exact path="/searchresults" component={SearchResults} />
        <Route exact path="/" component={MainPage} />
        <Route exact path="/login_redirect" component={LoginRedirect} />
        <GlobalStyle/>
      </ BrowserRouter>
    );
  }

}

export default connect(null, actions)(App);

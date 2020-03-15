import React, { Component } from 'react';
import { createGlobalStyle } from 'styled-components';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

import Navbar from './Navbar';
import Profile from './pages/Profile';
import MainPage from './pages/MainPage';
import SearchResults from './pages/SearchResults';

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
        <GlobalStyle/>
        <Navbar/>
      </ BrowserRouter>
    );
  }

}

export default connect(null, actions)(App);

const GlobalStyle = createGlobalStyle`
  *,
  *::after,
  *::before {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
`

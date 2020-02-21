import React, { Component } from 'react';
import { createGlobalStyle } from 'styled-components';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

import Navbar from './navbar/Navbar';
import Profile from './Profile';

class App extends Component {

  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    return (
      <BrowserRouter>
        <GlobalStyle/>
        <Navbar/>
        <Route exact path="/profile" component={Profile} />
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

import React, { Component } from 'react';
import { PageContainer } from '../styleComponents';
import styled from "styled-components";
import * as actions from "../../actions";
import { connect } from 'react-redux';

import mainPageImage from "../../assets/main-pic.jpg";

class MainPage extends Component {

  constructor(props) {
    super(props);
    this.state = {searchValue: ""}
  }

  componentDidMount() {
    window.addEventListener('keyup', e => this.handleKeypress(e) );
  }

  handleSubmit = (event) => {
    this.props.fetchSearchResults(this.state.searchValue);
    event.preventDefault();
  }

  handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      [name]: value
    });
  }

  handleKeypress = (event) => {
    if (event.which === 13 || event.key === 'Enter') {
      if (this.state.searchValue !== "") {
        this.handleSubmit(event);
        this.props.history.push('/searchresults');
      }
    }
  }

  render() {
    return (
      <PageContainer>
        <Cover>
          <p>Search restaurants near you.</p>
          <input spellcheck="false" type="text" name="searchValue" value={this.state.searchValue}  onChange={this.handleChange} />
        </Cover>
      </PageContainer>
    );
  }

}

const Cover = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background: linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.2)), url(${mainPageImage});
  background-size: cover;
  width: 100%;
  padding-bottom: 50px;
  height: 90vh;
  & p {
    color: white;
    font-size: 60px;
    padding: 10px;
    font-family: 'Raleway', 'sans-serif';
  }
  & input {
    background: none;
    width: 60%;
    outline: 0;
    border-width: 0 0 2px;
    font-size: 50px;
    color: grey;
    border-color: red;
  }
`

export default connect(null, actions)(MainPage);

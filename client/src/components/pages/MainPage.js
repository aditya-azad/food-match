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
    event.preventDefault();
    if (this.state.searchValue !== "") {
      this.props.fetchSearchResults(this.state.searchValue);
      this.props.history.push('/searchresults');
    }
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
    }
  }

  render() {
    return (
      <PageContainer>
        <Cover>
          <CoverContent>
            <p>Search restaurants near you.</p>
            <form onSubmit={this.handleSubmit}>
              <input spellCheck="false" type="text" name="searchValue"  onChange={this.handleChange} />
            </form>
          </CoverContent>
        </Cover>
        <FeaturesSection>
          <div>
            <p>Get directions to restaurants near you</p>
          </div>
          <div>
            <p>Receive recommendations based on your tastes</p>
          </div>
          <div>
            <p>Save your favourite restaurants</p>
          </div>
        </FeaturesSection>
      </PageContainer>
    );
  }

}

const FeaturesSection = styled.div `
  display: flex;
  justify-content: center;
  padding: 70px 0px;
  & div {
    margin: 0px 40px;
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100px;
    min-height: 50vh;
    word-wrap: break-word;
    flex: 1;
    font-family: Roboto;
    word-wrap: break-word;
    background-color: red;
  }
`

const CoverContent = styled.div`
  margin: 0px 40px;
  & p {
    color: white;
    font-size: 60px;
    font-family: 'Raleway', 'sans-serif';
  }
  & input {
    background: none;
    width: 100%;
    outline: 0;
    border-width: 0 0 2px;
    font-size: 50px;
    color: grey;
    border-color: red;
  }
`

const Cover = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background: linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.2)), url(${mainPageImage});
  background-size: cover;
  width: 100%;
  padding-bottom: 50px;
  height: 100vh;
`

export default connect(null, actions)(MainPage);

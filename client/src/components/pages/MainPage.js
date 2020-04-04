import React, { Component } from 'react';
import { PageContainer } from '../styleComponents';
import styled from "styled-components";
import * as actions from "../../actions";
import { connect } from 'react-redux';
import { geolocated } from 'react-geolocated';

import Layout from "../Layout";
import mainPageImage from "../../assets/main-pic.jpg";

class MainPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      searchValue: "",
      geolocationEnabled: false
    };
  }

  componentDidMount() {
    setTimeout( () => {
      this.setState({
        geolocationEnabled: (this.props.isGeolocationEnabled && this.props.isGeolocationAvailable)
      })
    }, 500)
  }

  handleSubmit = (event) => {
    event.preventDefault();
    let searchTerm = this.state.searchValue;
    if (searchTerm !== "") {
      searchTerm = searchTerm.split(","); 
      if (searchTerm.length === 2) { // user specified a location
        this.props.fetchSearchResults(searchTerm[0], searchTerm[1]);
      } else {
        if (this.state.geolocationEnabled) this.props.fetchSearchResults(searchTerm[0], this.props.coords.latitude, this.props.coords.longitude) ;
        else this.props.fetchSearchResults(searchTerm[0]);
      }
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

  render() {
    return (
      <Layout isHome={true}>
        <PageContainer>
          <Cover>
            <CoverContent>
              <p>Search restaurants near you.</p>
              <form onSubmit={this.handleSubmit}>
                <input placeholder= {this.state.geolocationEnabled ? "restaurant" : "restaurant, city"}
                       spellCheck="false"
                       type="text"
                       name="searchValue"
                       onChange={this.handleChange}
                />
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
      </Layout>
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
  background-position: center;
  width: 100%;
  padding-bottom: 50px;
  height: 100vh;
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
    color: #BDB8B4;
    border-color: #BDB8B4;
  }
`

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

export default connect(null, actions) (
  geolocated({
    positionOptions: {
      enableHighAccuracy: false
    },
    isOptimisticGeolocationEnabled: false,
    userDecisionTimeout: 5000,
  })(MainPage)
);

import React, { Component } from 'react';
import * as actions from '../../actions';
import { connect } from 'react-redux';
import { geolocated } from 'react-geolocated';
import { Cover, CoverContent, MainPageContainer, FeaturesSection } from '../styleComponents';
import Layout from '../Layout';

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
        <MainPageContainer>
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
        </MainPageContainer>
      </Layout>
    );
  }

}


export default connect(null, actions) (
  geolocated({
    positionOptions: {
      enableHighAccuracy: false
    },
    isOptimisticGeolocationEnabled: false,
    userDecisionTimeout: 5000,
  })(MainPage)
);

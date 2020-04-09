import React, {Component} from 'react';
import StoreCard from "../StoreCard";
import { connect } from 'react-redux';
import styled from "styled-components";

import Layout from "../Layout";
import { GeneralPageContainer } from '../styleComponents';

class SearchResults extends Component {
  
  renderRestaurants() {
    return (
      <div>
        {this.props.restaurants.map((item, index) => (
          <StoreCard key={index} restaurant={item} />
        ))}
      </div>
    )
  }

  render() {
    return (
      <Layout isHome={false}>
        <GeneralPageContainer>
          <h1>Results</h1>
          <Results>
            {this.renderRestaurants()}
          </Results>
        </GeneralPageContainer>
      </Layout>
    )
  }

}


const Results = styled.div`
  width: 60%;
`

const mapStateToProps = (state) => {
  return {
    restaurants: state.yelp === null ? [] : state.yelp.businesses
  }
}

export default connect(mapStateToProps)(SearchResults);

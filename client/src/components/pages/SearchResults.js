import React, {Component} from 'react';
import SearchItem from "../SearchItem";
import { connect } from 'react-redux';
import styled from "styled-components";

import Layout from "../Layout";

class SearchResults extends Component {
  
  renderRestaurants() {
    return (
      <div>
        {this.props.restaurants.map((item, index) => (
          <SearchItem key={index} restaurant={item} />
        ))}
      </div>
    )
  }

  render() {
    return (
      <Layout isHome={false}>
        <Container>
          <h1>Results</h1>
          <Results>
            {this.renderRestaurants()}
          </Results>
        </Container>
      </Layout>
    )
  }

}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 70px;
`

const Results = styled.div`
  width: 60%;
`

const mapStateToProps = (state) => {
  return {
    restaurants: state.yelp === null ? [] : state.yelp.businesses
  }
}

export default connect(mapStateToProps)(SearchResults);

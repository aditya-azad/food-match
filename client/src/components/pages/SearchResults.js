import React, {Component} from 'react';
import StoreCard from "../StoreCard";
import { connect } from 'react-redux';

import Layout from "../Layout";
import { GeneralPageContainer } from '../styleComponents';

class SearchResults extends Component {
  
  renderRestaurants() {
    return (
      <div style={{width: "100%", padding: "5px"}}>
        {this.props.restaurants.map((item, index) => (
          <StoreCard key={index} restaurant={item} />
        ))}
      </div>
    )
  }

  render() {
    return (
      <Layout>
        <GeneralPageContainer>
          <h1>Results</h1>
          {this.renderRestaurants()}
        </GeneralPageContainer>
      </Layout>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    restaurants: state.yelp === null ? [] : state.yelp.businesses
  }
}

export default connect(mapStateToProps)(SearchResults);

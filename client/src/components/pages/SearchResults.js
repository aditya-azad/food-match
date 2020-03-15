import React, {Component} from 'react';
import SearchItem from "../SearchItem";
import { connect } from 'react-redux';

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
      <>
        {this.renderRestaurants()}
      </>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    restaurants: state.yelp === null ? [] : state.yelp.businesses
  }
}

export default connect(mapStateToProps)(SearchResults);

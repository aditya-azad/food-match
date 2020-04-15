import React, { Component } from 'react';
import axios from 'axios';
import StorePopup from './StorePopup';
import { Image, Card } from './styleComponents';
import { connect } from 'react-redux';

class StoreCard extends Component {

  constructor(props) {
    super(props);
    this.state = { showPopup: false };
  }

  saveRestaurant = () => {
    axios.post(`/api/save_restaurant`, {restaurant_id: this.props.restaurant.id});
  }

  deleteRestaurant = () => {
    axios.post(`/api/delete_restaurant`, {restaurant_id: this.props.restaurant.id});
  }

  openPopup = () => {
    this.setState({
      showPopup: true,
    })
  }

  closePopup = () => {
    this.setState({
      showPopup: false,
    })
  }

  renderCategories() {
    let array = [];
    let restaurant = this.props.restaurant;
    for (let i = 0; i < restaurant.categories.length; i++) {
      array.push(
      <span key={i}>{restaurant.categories[i].title}</span>
      );
    }
    return(
      array
    )
  }

  render() {
    let restaurant = this.props.restaurant;
    return( 
      <Card>
        {this.props.auth.restaurants.indexOf(restaurant.id) !== -1 ?
          <button onClick={this.deleteRestaurant}>Delete</button> :
          <button onClick={this.saveRestaurant}>Save</button>
        }
        <div onClick={this.openPopup}>
          {this.state.showPopup ?
            <StorePopup store={restaurant} closePopup={this.closePopup}/>
            :null
          }
          <h2>{restaurant.name}</h2>  
          <p>{restaurant.location.address1}</p>
          <p>{restaurant.location.city}, {restaurant.location.state}</p>
          <p>{restaurant.display_phone}</p>
          {this.renderCategories()}
        </div>
          <Image src={restaurant.image_url} />
      </Card>
    ) 
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(StoreCard)
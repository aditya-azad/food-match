import React, { Component } from 'react';
import axios from 'axios';
import StorePopup from './StorePopup';
import { Image, Card, InnerCard, StoreInformation } from './styleComponents';
import { connect } from 'react-redux';

class StoreCard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showPopup: false,
      showSaveButton: this.props.auth.restaurants.indexOf(this.props.restaurant.id) !== -1 ? false : true
    };
  }

  saveRestaurant = () => {
    this.setState({showSaveButton: false})
    axios.post(`/api/save_restaurant`, {restaurant_id: this.props.restaurant.id});
  }

  deleteRestaurant = () => {
    this.setState({showSaveButton: true})
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
        <InnerCard>
          {this.state.showPopup ?
            <StorePopup store={restaurant} closePopup={this.closePopup}/>
            :null
          }
          <StoreInformation>
            <div>
              <h2 style={{cursor: "pointer"}} onClick={this.openPopup}>{restaurant.name}</h2>  
              <p>{restaurant.location.address1}</p>
              <p>{restaurant.location.city}, {restaurant.location.state}</p>
              <p>{restaurant.display_phone}</p>
              {this.renderCategories()}
            </div>
            { this.state.showSaveButton ?
              <button onClick={this.saveRestaurant}>Save</button>:
              <button onClick={this.deleteRestaurant}>Delete</button>
            }
          </StoreInformation>
          <Image src={restaurant.image_url} />
        </InnerCard>
      </Card>
    ) 
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(StoreCard)
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { GeneralPageContainer } from '../styleComponents';
import StoreCard from '../StoreCard';
import Layout from '../Layout';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

class Profile extends Component {

  constructor(props) {
    super(props);
    this.state = {
      restaurants: [],
      loggedIn: true
    }
  }

  componentDidMount() {
    this.checkLogin();
  }

  getRestaurants = async () => {
    if (this.props.auth) {
      let restaurantIDs = this.props.auth.restaurants;
      let restaurants = [];
      for (let i = 0; i < restaurantIDs.length; i++ ) {
        await axios.get(`/api/get_restaurant_by_id/?restaurant_id=${restaurantIDs[i]}`)
          .then( res => restaurants.push(res.data.jsonBody) );
      }
      this.setState({ restaurants });
    }
  }

  checkLogin = () => {
    if (!this.props.auth) {
      this.setState(
        {loggedIn: false}
      )
    }
  }

  renderRestaurants() {
    this.getRestaurants();
    return (
      <div>
        {this.state.restaurants.map((item, index) => (
          <StoreCard key={index} restaurant={item} />
        ))}
      </div>
    )
  }

  render() {
    return (
      <>
      {this.state.loggedIn === false ? <Redirect to="/login_redirect"/> :
      <Layout>
        <GeneralPageContainer>
          <h1>Your Restaurants</h1>
          {this.renderRestaurants()}
        </GeneralPageContainer>
      </Layout>
      }
      </>
    );
  }
};

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(Profile);

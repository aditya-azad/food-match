import React, { Component } from 'react';
import { PageContainer, CenterContainer } from '../styleComponents';
import * as actions from "../../actions";
import { connect } from 'react-redux';
import SearchItem from "../SearchItem";

class MainPage extends Component {

  // TODO: convert these handlers to arrow functions
  constructor(props) {
    super(props);
    this.state = {nameValue: "", locationValue: ""}
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    this.props.fetchSearchResults(this.state.nameValue, this.state.locationValue);
    event.preventDefault();
  }

  handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      [name]: value
    });
  }

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
      <PageContainer>
        <CenterContainer>
          <form onSubmit={this.handleSubmit}>
            <input type="text" name="nameValue" value={this.state.nameValue} placeholder="Name" onChange={this.handleChange} />
            <input type="text" name="locationValue" value={this.state.locationValue} placeholder="Location" onChange={this.handleChange} />
            <input type="submit" value="Submit" />
          </form>
          {this.renderRestaurants()}
        </CenterContainer>
      </PageContainer>
    );
  }

}

const mapStateToProps = (state) => {
  return {
    restaurants: state.yelp === null ? [] : state.yelp.businesses
  }
}

export default connect(mapStateToProps, actions)(MainPage);
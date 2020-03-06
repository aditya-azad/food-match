import React, { Component } from 'react';
import { PageContainer, CenterContainer } from '../styleComponents';
import * as actions from "../../actions";
import { connect } from 'react-redux';

class MainPage extends Component {

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

  render() {
    return (
      <PageContainer>
        <CenterContainer>
          <form onSubmit={this.handleSubmit}>
            <input type="text" name="nameValue" value={this.state.nameValue} placeholder="Name" onChange={this.handleChange} />
            <input type="text" name="locationValue" value={this.state.locationValue} placeholder="Location" onChange={this.handleChange} />
            <input type="submit" value="Submit" />
          </form>
        </CenterContainer>
      </PageContainer>
    );
  }

}

export default connect(null, actions)(MainPage);
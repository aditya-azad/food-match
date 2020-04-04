import React, { Component } from "react";
import styled from "styled-components";
import StoreMap from "./StoreMap";

class StorePopup extends Component {

  constructor(props) {
    super(props);
    window.addEventListener('keydown', e => this.handleKeydown(e));
  }

  handleKeydown = (e) => {
    // close the popup if escape pressed
    if (e.which === 27 || e.key === 'Escape') {
      this.props.closePopup();
    }
  }
  
  render() {
    return (
      <Popup>
        <InnerPopup>
          <h1>{this.props.store.name}</h1>
          <p>{this.props.store.location.address1}</p>
          <p>{this.props.store.location.city}, {this.props.store.location.state}</p>
          <p>{this.props.store.display_phone}</p>
          <StoreMap latitude={this.props.store.coordinates.latitude} longitude={this.props.store.coordinates.longitude}/>
        </InnerPopup>
      </Popup>
    )
  }
}

const Popup = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  background-color: rgba(0, 0, 0, 0.5);
`
const InnerPopup = styled.div`
  position: absolute;
  left: 25%;
  right: 25%;
  top: 25%;
  bottom: 25%;
  margin: auto;
  border-radius: 20px;
  background: white;
`

export default StorePopup;
import React, { Component } from 'react';
import StoreMap from './StoreMap';
import { Popup, InnerPopup } from './styleComponents';

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

export default StorePopup;
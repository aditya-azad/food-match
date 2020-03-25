import React, {Component} from 'react';
import Navbar from './Navbar';

class Layout extends Component {
  render() {
    return (
      <>
        <Navbar isHome={this.props.isHome}/>
        {this.props.children}
      </>
    );
  }
}

export default Layout;
import React, {Component} from 'react';
import Navbar from './Navbar';
import { LayoutContainer } from './styleComponents';

class Layout extends Component {
  render() {
    return (
      <>
        <Navbar isHome={this.props.isHome}/>
        <LayoutContainer>
          {this.props.children}
        </LayoutContainer>
      </>
    );
  }
}

export default Layout;
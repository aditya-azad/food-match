import React, {Component} from 'react';
import Navbar from './Navbar';
import styled from "styled-components";

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

const LayoutContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default Layout;
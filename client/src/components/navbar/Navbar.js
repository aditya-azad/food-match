import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from "styled-components";

import Brand from "./Brand";

class Navbar extends Component {

  renderContent() {
    switch(this.props.auth) {
      case null:
        return;
      case false:
        return (
          <li><a href="/auth/google">Login with Google</a></li>
        );
      default:
        return [
          <li key="1"><a href="/api/logout">Logout</a></li>,
          <li key="1"><Link to="/profile">Profile</Link></li>
        ];
    }
  }

  render() {
    return (
      <>
        <NavBar>
          <FlexContainer>
            <Brand />
            <MenuList>
              {this.renderContent()}
            </MenuList>
          </FlexContainer>
        </NavBar>
      </>
    )
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(Navbar);

const NavBar = styled.nav`
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 1;
  font-size: 1rem;
`;

const FlexContainer = styled.div`
  max-width: 120rem;
  display: flex;
  margin: auto;
  padding: 0 2rem;;
  justify-content: space-between;
  align-items: center;
  height: 3rem;
`;

const MenuList = styled.ul `
  list-style-type: none;
  justify-self: end;
  display: flex;
  margin: auto 0;
  & li {
    margin: 0.5rem;
  }
  & a {
    text-transform: uppercase;
    text-decoration: none;
    cursor: pointer;
  }
`;
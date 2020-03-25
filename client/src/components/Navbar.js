import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from "styled-components";

class Navbar extends Component {

  state = {
    isMounted: false,
    menuOpen: false,
    scrollDirection: 'none',
    lastScrollTop: 0,
  };

  componentDidMount() {
    setTimeout(
      () => 
        this.setState({ isMounted: true }, () => {
          window.addEventListener('scroll', () => this.handleScroll() );
          window.addEventListener('resize', () => this.handleResize() );
          window.addEventListener('keydown', e => this.handleKeydown(e) );
        }),
      100,
    );
  }

  toggleMenu = () => this.setState({ menuOpen: !this.state.menuOpen });

  handleScroll = () => {
    const { menuOpen, scrollDirection, lastScrollTop, isMounted } = this.state;
    const fromTop = window.scrollY;
    const delta = 5;
    
    // if scrolled less than delta, don't do anything
    if (!isMounted || Math.abs(lastScrollTop - fromTop) <= delta || menuOpen) {
      return;
    }

    // set the scroll direction
    if (fromTop < delta) {
      this.setState({ scrollDirection: 'none' });
    } else if (fromTop > lastScrollTop) {
          if (scrollDirection !== 'down') {
        this.setState({ scrollDirection: 'down' });
      }
    } else if (fromTop + window.innerHeight < document.body.scrollHeight) {
      if (scrollDirection !== 'up') {
        this.setState({ scrollDirection: 'up' });
      }
    }

    this.setState({ lastScrollTop: fromTop });
  };

  handleKeydown = e => {
    if (!this.state.menuOpen) {
      return;
    }
    // close the menu if escape pressed
    if (e.which === 27 || e.key === 'Escape') {
      this.toggleMenu();
    }
  }

  handleResize = () => {
    if (window.innerWidth > 768 && this.state.menuOpen) {
      this.toggleMenu();
    }
  }

  renderMenu = () => {
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
          <li key="2"><Link to="/profile">Profile</Link></li>
        ];
    }
  }

  render() {
    const { scrollDirection } = this.state;
    return (
      <NavBar scrollDirection={scrollDirection} isHome={this.props.isHome}>
        <FlexContainer>
          <Brand>
            <a href="/">Food Match</a>
          </Brand>
          <MenuList>
            {this.renderMenu()}
          </MenuList>
        </FlexContainer>
      </NavBar>
    )
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(Navbar);

const NavBar = styled.header`
  position: fixed;
  display: flex;
  align-items: center;
  top: 0;
  width: 100%;
  z-index: 11;
  padding: 0px 20px;
  background-color: ${props => (props.scrollDirection === 'none' && props.isHome ? '' : 'Black')};
  transition: all 0.25s cubic-bezier(0.645, 0.045, 0.355, 1);
  height: 60px};
  box-shadow: ${props => props.scrollDirection === 'none' ? 'none' : `0 10px 30px -10px rgba(0, 0, 0, 0.7)`};
`

const FlexContainer = styled.div`
  display: flex;
  position: relative;
  width: 100%;
  justify-content: space-between;
  z-index: 12;
`;

const Brand = styled.div `
  list-style-type: none;
  display: flex;
  margin: auto 0;
  & a {
    text-transform: uppercase;
    text-decoration: none;
    cursor: pointer;
  }
`;

const MenuList = styled.ul `
  list-style-type: none;
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
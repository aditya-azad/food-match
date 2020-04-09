import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { NavBar, FlexContainer, Brand, MenuList } from './styleComponents';

// Source: Brittany Chiang, https://brittanychiang.com/
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
          <li><a href="/auth/google">Login</a></li>
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
            <a href="/">Food Route</a>
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

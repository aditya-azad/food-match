import React, { Component } from 'react';
import { connect } from 'react-redux';
import { GeneralPageContainer } from '../styleComponents';
import Layout from "../Layout";

class Profile extends Component {

  checkLogin = () => {
    if (!this.props.auth) return true;
    return false;
  }

  render() {
    return (
      <>
      {this.checkLogin() ? <p>You need to login</p> :
      <Layout isHome={false}>
        <GeneralPageContainer>
          <h1>Profile</h1>
        </GeneralPageContainer>
      </Layout>
      }
      </>
    );
  }
};

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps)(Profile);

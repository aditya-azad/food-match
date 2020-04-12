import React, {Component} from 'react';
import Layout from '../Layout';
import { Message } from '../styleComponents';

class LoginRedirect extends Component {

  render() {
    return (
      <Layout>
        <Message>
          <h1>You need to <a href="/auth/google">login</a></h1>
        </Message>
      </Layout>
    )
  }

}

export default LoginRedirect;
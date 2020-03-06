import  React, { Component } from 'react';
import { PageContainer, CenterContainer } from '../styleComponents';
import { connect } from 'react-redux';
import * as actions from "../../actions";

class SearchResults extends Component {

  componentDidMount() {
    this.props.fetchSearchByNameLocationResults();
  }

  render() {
    return (
      <PageContainer>
        <CenterContainer>
          <h1>Search Results</h1>
        </CenterContainer>
      </PageContainer>
    );
  }

}


export default connect(null, actions)(SearchResults);

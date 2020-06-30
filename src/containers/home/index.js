import React, { Component } from 'react';
// import PropTypes from 'prop-types';

import Layout from '../layout';
import AllComponentsList from '../../components/allcomponents';

class HomeContainer extends Component {
  componentDidMount() {
    // mount
  }

  render() {
    return (
      <Layout>
        <AllComponentsList />
      </Layout>
    );
  }
}

HomeContainer.propTypes = {

};

export default HomeContainer;

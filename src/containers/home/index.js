import React, { Component } from 'react';
// import PropTypes from 'prop-types';

import Layout from '../layout';
// import AllComponentsList from '../../components/allcomponents';

class HomeContainer extends Component {
  componentDidMount() {
    // mount
  }

  render() {
    return (
      <Layout>
        <h1>Hola Mundo</h1>
      </Layout>
    );
  }
}

HomeContainer.propTypes = {

};

export default HomeContainer;

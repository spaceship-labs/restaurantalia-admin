import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import HeadComponent from '../../components/head';
import Layout from '../layout';
// import AllComponentsList from '../../components/allcomponents';

class HomeContainer extends Component {
  componentDidMount() {
    // mount
  }

  render() {
    return (
      <Layout>
        <HeadComponent
          title="Bienvenido a Restaurantalia"
        />
      </Layout>
    );
  }
}

HomeContainer.propTypes = {

};

export default HomeContainer;

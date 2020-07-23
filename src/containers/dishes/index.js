import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Layout from '../layout';
import HeadComponent from '../../components/head';
import TableComponent from '../../components/table';
import { mainDispatcher } from './dispatcher';
import selectors from './selectors';

class DishesContainer extends Component {
  componentDidMount() {
    const {
      getCategoriesDishes,
    } = this.props;
    getCategoriesDishes();
  }

  render() {
    const { dishesList } = this.props;
    const attrsArray = [
      {
        attr: 'nombre',
        label: 'Nombre',
        type: 'string',
      },
      {
        attr: 'orden',
        label: 'Orden',
        type: 'number',
      },
      {
        attr: 'precio',
        label: 'Precio',
        type: 'money',
      },
      {
        attr: 'descripcion',
        label: 'Descripcion',
        type: 'string',
      },
    ];
    return (
      <Layout>
        <HeadComponent
          title="Platillos"
          description="Listado de platillos disponibles en tus resaurantes"
          createUrl="/platillos/crear"
        />
        <TableComponent
          elements={dishesList}
          columns={attrsArray}
          collection="platillos"
          editButton
        />
      </Layout>
    );
  }
}

DishesContainer.propTypes = {
  dishesList: PropTypes.object.isRequired,
  getCategoriesDishes: PropTypes.func.isRequired,
};

export default connect(
  selectors.propsSelector,
  mainDispatcher,
)(DishesContainer);

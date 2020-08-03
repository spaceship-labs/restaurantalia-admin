import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Layout from '../layout';
import HeadComponent from '../../components/head';
import TableComponent from '../../components/table';
import { mainDispatcher } from './dispatcher';
import selectors from './selectors';

class CategoriesContainer extends Component {
  componentDidMount() {
    const {
      getCategories,
    } = this.props;

    getCategories();
  }

  render() {
    const { categoriesList } = this.props;
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
        attr: 'platillosCount',
        label: '# Platillos',
        type: 'number',
      },
    ];
    return (
      <Layout>
        <HeadComponent
          title="Categorias"
          description="Listado de categorias disponibles para tus menus"
          createUrl="/categorias/crear"
        />
        <TableComponent
          elements={categoriesList}
          columns={attrsArray}
          collection="categorias"
          editButton
        />
      </Layout>
    );
  }
}

CategoriesContainer.propTypes = {
  categoriesList: PropTypes.object.isRequired,
  getCategories: PropTypes.func.isRequired,
};

export default connect(
  selectors.propsSelector,
  mainDispatcher,
)(CategoriesContainer);

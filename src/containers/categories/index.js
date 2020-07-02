import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import HeadComponent from '../../components/head';
import TableComponent from '../../components/table';
import LoadingComponent from '../../components/loading';
import { mainDispatcher } from './dispatcher';
import selectors from './selectors';

class CategoriesContainerNoConnect extends Component {
  componentDidMount() {
    const {
      getCategories, setCategoriesLoading,
    } = this.props;

    getCategories();
    setCategoriesLoading({ loading: true });
  }

  render() {
    const { categoriesList, loading } = this.props;
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
      <>
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
        <LoadingComponent open={loading} />
      </>
    );
  }
}

CategoriesContainerNoConnect.propTypes = {
  categoriesList: PropTypes.object.isRequired,
  // categoriesIds: PropTypes.arrayOf(PropTypes.string).isRequired,
  loading: PropTypes.bool.isRequired,
  getCategories: PropTypes.func.isRequired,
  setCategoriesLoading: PropTypes.func.isRequired,
};

const CategoriesContainer = connect(
  selectors.propsSelector,
  mainDispatcher,
)(CategoriesContainerNoConnect);

export { CategoriesContainerNoConnect };
export default CategoriesContainer;

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import HeadComponent from '../../components/head';
import TableComponent from '../../components/table';
import LoadingComponent from '../../components/loading';
import categoriesActions from '../../actions/categories';

class CategoriesContainerNoConnect extends Component {
  constructor(props) {
    super(props);
    const {
      categoriesIds, getCategories, setCategoriesLoading,
    } = this.props;
    // console.log('categoriesIds', categoriesIds);
    if (categoriesIds.length === 0) {
      getCategories();
      setCategoriesLoading({ loading: true });
    }
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
  categoriesIds: PropTypes.arrayOf(PropTypes.string).isRequired,
  loading: PropTypes.bool.isRequired,
  getCategories: PropTypes.func.isRequired,
  setCategoriesLoading: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  const { categoriesList, categoriesIds, loading } = state.categories;
  return {
    categoriesList, categoriesIds, loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  const { getCategories, setCategoriesLoading } = categoriesActions.creators;
  return bindActionCreators(
    {
      getCategories,
      setCategoriesLoading,
    },
    dispatch,
  );
};

const CategoriesContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(CategoriesContainerNoConnect);

export { CategoriesContainerNoConnect };
export default CategoriesContainer;

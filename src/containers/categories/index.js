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
      categoriesIds, getCategories, setCategoriesLogin,
    } = this.props;
    // console.log('categoriesIds', categoriesIds);
    if (categoriesIds.length === 0) {
      getCategories();
      setCategoriesLogin({ loading: true });
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
        />
        <TableComponent
          elements={categoriesList}
          columns={attrsArray}
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
  setCategoriesLogin: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  const { categoriesList, categoriesIds, loading } = state.categories;
  return {
    categoriesList, categoriesIds, loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  const { getCategories, setCategoriesLogin } = categoriesActions.creators;
  return bindActionCreators(
    {
      getCategories,
      setCategoriesLogin,
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

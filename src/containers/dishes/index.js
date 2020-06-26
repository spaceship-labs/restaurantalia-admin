import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import HeadComponent from '../../components/head';
import TableComponent from '../../components/table';
import LoadingComponent from '../../components/loading';
import dishesActions from '../../actions/dishes';

class DishesContainerNoConnect extends Component {
  constructor(props) {
    super(props);
    const {
      dishesIds, getCategoriesDishes, setDishesLoading,
    } = this.props;
    if (dishesIds.length === 0) {
      setDishesLoading({ loading: true });
      getCategoriesDishes();
    }
  }

  render() {
    const { dishesList, loading } = this.props;
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
      <>
        <HeadComponent
          title="Platillos"
          description="Listado de platillos disponibles en tus resaurantes"
        />
        <TableComponent
          elements={dishesList}
          columns={attrsArray}
          editButton
        />
        <LoadingComponent open={loading} />
      </>
    );
  }
}

DishesContainerNoConnect.propTypes = {
  dishesList: PropTypes.object.isRequired,
  dishesIds: PropTypes.arrayOf(PropTypes.string).isRequired,
  loading: PropTypes.bool.isRequired,
  getCategoriesDishes: PropTypes.func.isRequired,
  setDishesLoading: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  const { dishesList, dishesIds, loading } = state.dishes;
  return {
    dishesList, dishesIds, loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  const { getCategoriesDishes, setDishesLoading } = dishesActions.creators;
  return bindActionCreators(
    {
      getCategoriesDishes,
      setDishesLoading,
    },
    dispatch,
  );
};

const DishesContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(DishesContainerNoConnect);

export { DishesContainerNoConnect };
export default DishesContainer;

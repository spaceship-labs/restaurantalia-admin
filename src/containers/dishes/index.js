import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Layout from '../layout';
import HeadComponent from '../../components/head';
import TableComponent from '../../components/table';
import LoadingComponent from '../../components/loading';
import { mainDispatcher } from './dispatcher';
import selectors from './selectors';

class DishesContainerNoConnect extends Component {
  componentDidMount() {
    const {
      getCategoriesDishes, setDishesLoading,
    } = this.props;

    getCategoriesDishes();
    setDishesLoading({ loading: true });
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
        <LoadingComponent open={loading} />
      </Layout>
    );
  }
}

DishesContainerNoConnect.propTypes = {
  dishesList: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  getCategoriesDishes: PropTypes.func.isRequired,
  setDishesLoading: PropTypes.func.isRequired,
};

const DishesContainer = connect(
  selectors.propsSelector,
  mainDispatcher,
)(DishesContainerNoConnect);

export { DishesContainerNoConnect };
export default DishesContainer;

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import HeadComponent from '../../components/head';
import FormComponent from '../../components/form';
import { createDispatcher } from './dispatcher';

class CreateDishContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formInputs: [
        {
          attr: 'name',
          label: 'Nombre',
          value: 'mi nombre',
          type: 'text',
        },
        {
          attr: 'orden',
          label: 'Orden',
          value: '1',
          type: 'number',
        },
        {
          attr: 'precio',
          label: 'Precio',
          value: '',
          type: 'number',
        },
        {
          attr: 'cantidad',
          label: 'Cantidad',
          value: '',
          type: 'number',
        },
        {
          attr: 'descripcion',
          label: 'Descripcion',
          value: '',
          type: 'text',
        },
        {
          attr: 'categorias',
          label: 'Categorias',
          value: [],
          type: 'select',
          items: [
            {
              id: 1,
              nombre: 'opcion 1',
            },
            {
              id: 2,
              nombre: 'opcion 2',
            },
          ],
        },
      ],
    };
    this.handleSubmit = this.handleSubmit(this);
  }

  componentDidMount() {
    const { match, getDish, setDishesLoading } = this.props;
    const { params: { id: dishId } } = match;

    if (dishId) {
      getDish(dishId);
      setDishesLoading({ loading: true });
    }
  }

  handleSubmit() {
    console.log('CREATE PROPS', this.state);
    const {
      updateDish,
      createDish,
      match: {
        params: { id: dishId },
      },
    } = this.props;

    if (dishId) updateDish();
    else createDish();
  }

  render() {
    const { formInputs } = this.state;
    return (
      <>
        <HeadComponent
          title="Crear platillo"
        />
        <FormComponent
          handleSubmit={this.handleSubmit}
          fields={formInputs}
        />
      </>
    );
  }
}

CreateDishContainer.propTypes = {
  match: PropTypes.object.isRequired,
  getDish: PropTypes.func.isRequired,
  setDishesLoading: PropTypes.func.isRequired,
  createDish: PropTypes.func.isRequired,
  updateDish: PropTypes.func.isRequired,
};

export default connect(null, createDispatcher)(CreateDishContainer);

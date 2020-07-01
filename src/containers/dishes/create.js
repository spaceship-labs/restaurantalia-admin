import React, { Component } from 'react';
import HeadComponent from '../../components/head';
import FormComponent from '../../components/form';

class CreateDishContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formInputs: {
        name: {
          attr: 'name',
          label: 'Nombre',
          value: 'mi nombre',
          type: 'text',
        },
        orden: {
          attr: 'orden',
          label: 'Orden',
          value: '1',
          type: 'number',
        },
        precio: {
          attr: 'precio',
          label: 'Precio',
          value: '',
          type: 'number',
        },
        cantidad: {
          attr: 'cantidad',
          label: 'Cantidad',
          value: '',
          type: 'number',
        },
        descripcion: {
          attr: 'descripcion',
          label: 'Descripcion',
          value: '',
          type: 'text',
        },
        categorias: {
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
      },
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit() {
    console.log('CREATE PROPS', this.state);
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
          handleInputChange={() => console.log('change')}
          fields={formInputs}
        />
      </>
    );
  }
}

export default CreateDishContainer;

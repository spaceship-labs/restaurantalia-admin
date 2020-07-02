import React, { Component } from 'react';
import Layout from '../layout';
import HeadComponent from '../../components/head';
import FormComponent from '../../components/form';

class FormDishContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formInputs: {
        name: {
          attr: 'name',
          label: 'Nombre',
          value: 'mi nombre',
          type: 'text',
          isRequired: true,
          error: false,
        },
        orden: {
          attr: 'orden',
          label: 'Orden',
          value: '1',
          type: 'number',
          isRequired: false,
          error: false,
        },
        precio: {
          attr: 'precio',
          label: 'Precio',
          value: '',
          type: 'number',
          isRequired: true,
          error: false,
        },
        cantidad: {
          attr: 'cantidad',
          label: 'Cantidad',
          value: '',
          type: 'number',
          isRequired: false,
          error: false,
        },
        descripcion: {
          attr: 'descripcion',
          label: 'Descripcion',
          value: '',
          type: 'text',
          isRequired: false,
          error: false,
        },
        categorias: {
          attr: 'categorias',
          label: 'Categorias',
          value: [],
          type: 'select',
          isRequired: true,
          error: false,
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
      <Layout>
        <HeadComponent
          title="Crear platillo"
        />
        <FormComponent
          handleSubmit={this.handleSubmit}
          handleInputChange={() => console.log('change')}
          fields={formInputs}
        />
      </Layout>
    );
  }
}

export default FormDishContainer;

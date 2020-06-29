import React, { Component } from 'react';
import HeadComponent from '../../components/head';
import FormComponent from '../../components/form';

class CreateCategoryContainer extends Component {
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
          attr: 'descripcion',
          label: 'Descripcion',
          value: '',
          type: 'text',
        },
        {
          attr: 'menus',
          label: 'Menus',
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

  handleSubmit() {
    console.log('CREATE PROPS', this.state);
  }

  render() {
    const { formInputs } = this.state;
    return (
      <>
        <HeadComponent
          title="Crear categoria"
        />
        <FormComponent
          handleSubmit={this.handleSubmit}
          fields={formInputs}
        />
      </>
    );
  }
}

export default CreateCategoryContainer;

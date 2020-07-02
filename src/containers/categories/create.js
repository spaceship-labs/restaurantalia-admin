import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import HeadComponent from '../../components/head';
import FormComponent from '../../components/form';
import { createDispatcher } from './dispatcher';

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
              id: 1, // Porque va un id?
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
    const { match, getCategory, setLoading } = this.props;
    const { params: { id: categoryId } } = match;

    if (categoryId) {
      getCategory(categoryId);
      setLoading({ loading: true });
    }
  }

  handleSubmit() {
    console.log('CREATE PROPS', this.state);
    const {
      updateCategory,
      createCategory,
      match: {
        params: { id: categoryId },
      },
    } = this.props;

    if (categoryId) updateCategory();
    else createCategory();
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

CreateCategoryContainer.propTypes = {
  match: PropTypes.object.isRequired,
  getCategory: PropTypes.func.isRequired,
  setLoading: PropTypes.func.isRequired,
  createCategory: PropTypes.func.isRequired,
  updateCategory: PropTypes.func.isRequired,
};

export default connect(null, createDispatcher)(CreateCategoryContainer);

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Layout from '../layout';
import HeadComponent from '../../components/head';
import FormComponent from '../../components/form';
import { inputHandle, isValidForm } from '../../utils/inputvalidation';
import MessageComponent from '../../components/message';

class FormMenuContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      validForm: false,
      showAlert: false,
      formInputs: [],
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleCloseMessage = this.handleCloseMessage.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const { formInputs } = this.state;
    // si el prop que indica crear/editar hay que esperar la info del elemento
    if (formInputs.length === 0) {
      const newInputs = {
        name: {
          attr: 'name',
          label: 'Nombre',
          value: '',
          type: 'text',
          isRequired: true,
          error: false,
        },
        descripcion: {
          attr: 'slug',
          label: 'Nombre url',
          value: '',
          type: 'text',
          isRequired: true,
          error: false,
        },
        categorias: {
          attr: 'categorias',
          label: 'Categorias',
          value: [],
          type: 'multiselect',
          isRequired: true,
          error: false,
          items: [
            {
              id: 1,
              nombre: 'categoria 1',
            },
            {
              id: 2,
              nombre: 'categoria 2',
            },
          ],
        },
        templates: {
          attr: 'templates',
          label: 'Template',
          value: '',
          type: 'select',
          isRequired: true,
          error: false,
          items: [
            {
              id: 1,
              nombre: 'template 1',
            },
            {
              id: 2,
              nombre: 'template 2',
            },
          ],
        },
      };
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({
        formInputs: newInputs,
      });
    }
  }

  handleCloseMessage() {
    this.setState({ showAlert: false });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { type } = this.props;
    const { formInputs } = this.state;
    const newValidForm = isValidForm(formInputs);
    this.setState({
      validForm: newValidForm,
      showAlert: true,
    });
    if (newValidForm) {
      // dependiendo del prop es si llama a crear o a editar
      console.log('SUBMIT', type, formInputs);
    }
  }

  handleInputChange(e) {
    const { formInputs } = this.state;
    const newFormInputs = inputHandle(formInputs, e.target);
    this.setState({
      formInputs: newFormInputs,
    });
  }

  render() {
    const { type } = this.props;
    const { validForm, formInputs, showAlert } = this.state;
    const message = validForm
      ? 'Guardando menu...!'
      : 'Favor de revisar los datos...!';
    const messageType = validForm ? 'success' : 'error';
    return (
      <Layout>
        <HeadComponent
          title={`${type === 'create' ? 'Crear' : 'Editar'} menu`}
        />
        <FormComponent
          handleSubmit={this.handleSubmit}
          handleInputChange={this.handleInputChange}
          fields={formInputs}
        />
        <MessageComponent
          open={showAlert}
          handleClose={this.handleCloseMessage}
          message={message}
          type={messageType}
        />
      </Layout>
    );
  }
}

FormMenuContainer.propTypes = {
  type: PropTypes.string.isRequired,
};

export default FormMenuContainer;

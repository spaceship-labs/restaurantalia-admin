import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Layout from '../layout';
import HeadComponent from '../../components/head';
import FormComponent from '../../components/form';
import categoryActions from '../../actions/categories';
import { inputHandle, isValidForm } from '../../utils/inputvalidation';
import MessageComponent from '../../components/message';

class FormCategoryContainerNoConnect extends Component {
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
    // si el prop indica que es editar hay que pedir la info de esta categoria
  }

  componentDidUpdate() {
    const { formInputs } = this.state;
    const { menusList, menusIds } = this.props;
    // si el prop que indica crear/editar hay que esperar la info del elemento
    if (formInputs.length === 0 && menusIds.length > 0) {
      const newInputs = {
        name: {
          attr: 'name',
          label: 'Nombre',
          value: '',
          type: 'text',
          isRequired: true,
          error: false,
        },
        orden: {
          attr: 'orden',
          label: 'Orden',
          value: 0,
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
        menus: {
          attr: 'menus',
          label: 'Menus',
          value: [],
          type: 'select',
          isRequired: true,
          error: false,
          items: menusIds.map((m) => {
            const { id, nombre } = menusList[m];
            return { id, nombre };
          }),
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
    const { createCategory } = this.props;
    const { formInputs } = this.state;
    const newValidForm = isValidForm(formInputs);
    this.setState({
      validForm: newValidForm,
      showAlert: true,
    });
    if (newValidForm) {
      // dependiendo del prop es si llama a crear o a editar
      createCategory();
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
      ? 'Creando categoria...!'
      : 'Favor de revisar los datos...!';
    const messageType = validForm ? 'success' : 'error';
    return (
      <Layout>
        <HeadComponent
          title={`${type === 'create' ? 'Crear' : 'Editar'} categoria`}
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

FormCategoryContainerNoConnect.propTypes = {
  createCategory: PropTypes.func.isRequired,
  menusIds: PropTypes.arrayOf(PropTypes.string).isRequired,
  menusList: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => {
  const { menusList, menusIds, loading } = state.menus;
  return { menusList, menusIds, loading };
};

const mapDispatchToProps = (dispatch) => {
  const { createCategory } = categoryActions.creators;
  return bindActionCreators(
    {
      createCategory,
    },
    dispatch,
  );
};

const FormCategoryContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(FormCategoryContainerNoConnect);

export { FormCategoryContainerNoConnect };
export default FormCategoryContainer;

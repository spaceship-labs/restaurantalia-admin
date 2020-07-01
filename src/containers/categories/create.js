import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import HeadComponent from '../../components/head';
import FormComponent from '../../components/form';
import categoryActions from '../../actions/categories';

class CreateCategoryContainerNoConnect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      send: false,
      formInputs: [],
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentDidUpdate() {
    const { formInputs } = this.state;
    const { menusList, menusIds } = this.props;
    if (formInputs.length === 0 && menusIds.length > 0) {
      const newInputs = {
        name: {
          attr: 'name',
          label: 'Nombre',
          value: '',
          type: 'text',
        },
        orden: {
          attr: 'orden',
          label: 'Orden',
          value: '0',
          type: 'number',
        },
        descripcion: {
          attr: 'descripcion',
          label: 'Descripcion',
          value: '',
          type: 'text',
        },
        menus: {
          attr: 'menus',
          label: 'Menus',
          value: [],
          type: 'select',
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

  handleSubmit() {
    const { createCategory } = this.props;
    const { send, formInputs } = this.state;
    console.log('values', formInputs);
    if (send) {
      createCategory();
    }
  }

  handleInputChange(e) {
    const { value, name } = e.target;
    const { formInputs } = this.state;
    const newInput = { ...formInputs[name], value };
    const newFormInputs = { ...formInputs, [name]: newInput };
    this.setState({
      formInputs: newFormInputs,
    });
    console.log('CHANGE', newFormInputs);
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
          handleInputChange={this.handleInputChange}
          fields={formInputs}
        />
      </>
    );
  }
}

CreateCategoryContainerNoConnect.propTypes = {
  createCategory: PropTypes.func.isRequired,
  menusIds: PropTypes.arrayOf(PropTypes.string).isRequired,
  menusList: PropTypes.object.isRequired,
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

const CreateCategoryContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(CreateCategoryContainerNoConnect);

export { CreateCategoryContainerNoConnect };
export default CreateCategoryContainer;

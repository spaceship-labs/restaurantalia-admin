import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import HeadComponent from '../../components/head';
import FormComponent from '../../components/form';
import { createDispatcher } from './dispatcher';
import Layout from '../layout';
import selectors from './selectors';
// import { inputHandle, isValidForm } from '../../utils/inputvalidation';
// import MessageComponent from '../../components/message';

// class FormCategoryContainerNoConnect extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       validForm: false,
//       showAlert: false,
//       formInputs: [],
//     };
//     this.handleSubmit = this.handleSubmit.bind(this);
//     this.handleInputChange = this.handleInputChange.bind(this);
//     this.handleCloseMessage = this.handleCloseMessage.bind(this);
//     // si el prop indica que es editar hay que pedir la info de esta categoria
//   }

//   componentDidMount() {
//     const { match, getCategory, setLoading } = this.props;
//     const { params: { id: categoryId } } = match;

//     if (categoryId) {
//       getCategory(categoryId);
//       setLoading({ loading: true });
//     }
//   }

//   componentDidUpdate() {
//     const { formInputs } = this.state;
//     const { menusList, menusIds } = this.props;
//     // si el prop que indica crear/editar hay que esperar la info del elemento
//     if (formInputs.length === 0 && menusIds.length > 0) {
//       const newInputs = {
//         name: {
//           attr: 'name',
//           label: 'Nombre',
//           value: '',
//           type: 'text',
//           isRequired: true,
//           error: false,
//         },
//         orden: {
//           attr: 'orden',
//           label: 'Orden',
//           value: 0,
//           type: 'number',
//           isRequired: false,
//           error: false,
//         },
//         descripcion: {
//           attr: 'descripcion',
//           label: 'Descripcion',
//           value: '',
//           type: 'text',
//           isRequired: false,
//           error: false,
//         },
//         menus: {
//           attr: 'menus',
//           label: 'Menus',
//           value: [],
//           type: 'select',
//           isRequired: true,
//           error: false,
//           items: menusIds.map((m) => {
//             const { id, nombre } = menusList[m];
//             return { id, nombre };
//           }),
//         },
//       };
//       // eslint-disable-next-line react/no-did-update-set-state
//       this.setState({
//         formInputs: newInputs,
//       });
//     }
//   }

//   handleCloseMessage() {
//     this.setState({ showAlert: false });
//   }

//   handleSubmit(e) {
//     e.preventDefault();
//     const {
//       updateCategory,
//       createCategory,
//       match: {
//         params: { id: categoryId },
//       },
//     } = this.props;

//     const { formInputs } = this.state;
//     const newValidForm = isValidForm(formInputs);
//     this.setState({
//       validForm: newValidForm,
//       showAlert: true,
//     });
//     if (newValidForm) {
//       // dependiendo del prop es si llama a crear o a editar
//       createCategory();
//     }

//     if (categoryId) updateCategory();
//     else createCategory();
//   }

//   handleInputChange(e) {
//     const { formInputs } = this.state;
//     const newFormInputs = inputHandle(formInputs, e.target);
//     this.setState({
//       formInputs: newFormInputs,
//     });
//   }

//   render() {
//     const { type } = this.props;
//     const { validForm, formInputs, showAlert } = this.state;
//     const message = validForm
//       ? 'Creando categoria...!'
//       : 'Favor de revisar los datos...!';
//     const messageType = validForm ? 'success' : 'error';
//     return (
//       <Layout>
//         <HeadComponent
//           title={`${type === 'create' ? 'Crear' : 'Editar'} categoria`}
//         />
//         <FormComponent
//           handleSubmit={this.handleSubmit}
//           handleInputChange={this.handleInputChange}
//           fields={formInputs}
//         />
//         <MessageComponent
//           open={showAlert}
//           handleClose={this.handleCloseMessage}
//           message={message}
//           type={messageType}
//         />
//       </Layout>
//     );
//   }
// }

// FormCategoryContainerNoConnect.propTypes = {
//   match: PropTypes.object.isRequired,
//   getCategory: PropTypes.func.isRequired,
//   setLoading: PropTypes.func.isRequired,
//   createCategory: PropTypes.func.isRequired,
//   updateCategory: PropTypes.func.isRequired,
//   type: PropTypes.string.isRequired,
//   menusIds: PropTypes.arrayOf(PropTypes.string).isRequired,
//   menusList: PropTypes.object.isRequired,
// };

// export default connect(null, createDispatcher)(FormCategoryContainerNoConnect);

const formInputs = {
  nombre: {
    attr: 'nombre',
    label: 'Nombre',
    type: 'text',
    isRequired: true,
    error: false,
  },
  orden: {
    attr: 'orden',
    label: 'Orden',
    type: 'number',
    isRequired: false,
    error: false,
  },
  descripcion: {
    attr: 'descripcion',
    label: 'Descripcion',
    type: 'text',
    isRequired: false,
    error: false,
  },
  menus: {
    attr: 'menus',
    label: 'Menus',
    type: 'select',
    isRequired: true,
    error: false,
  },
};

const createChangeCb = (currentVal, setCb) => (newVal) => setCb({ ...currentVal, value: newVal });

const CategoryCreate = ({
  loading,
  category,
  match,
  getCategory,
  setCategoriesLoading,
  menus,
  updateCategory,
  createCategory,
  initForm,
}) => {
  const [nombreField, setName] = useState({ name: 'nombre', value: '' });
  const [ordenField, setOrden] = useState({ name: 'orden', value: '' });
  const [descripcionField, setDescripcion] = useState({ name: 'descripcion', value: '' });
  const [menusField, setmenus] = useState({ name: 'menus', value: [] });

  const { params: { id: catId } } = match;

  useEffect(() => {
    initForm();
  }, []);

  useEffect(() => {
    if (catId) {
      getCategory(catId);
      setCategoriesLoading({ loading: true });
    }
  }, [catId]);

  useEffect(() => {
    const {
      nombre,
      orden,
      descripcion,
      menus: ms = [],
    } = category;
    console.log('/////////////////////');
    console.log(category);
    console.log('/////////////////////');
    setName({ ...nombreField, value: nombre });
    setOrden({ ...ordenField, value: orden });
    setDescripcion({ ...descripcionField, value: descripcion });
    setmenus({ ...menusField, value: ms });
  }, [loading]);

  function handleSubmit(e) {
    e.preventDefault();
    const actionPayload = {
      nombreField,
      ordenField,
      descripcionField,
      menusField,
    };
    if (catId) updateCategory({ ...actionPayload, catId });
    else createCategory(actionPayload);
  }

  const formEntries = [
    { ...nombreField, change: createChangeCb(nombreField, setName) },
    { ...ordenField, change: createChangeCb(ordenField, setOrden) },
    { ...descripcionField, change: createChangeCb(descripcionField, setDescripcion) },
    { ...menusField, change: createChangeCb(menusField, setmenus), items: menus },
  ];

  console.log('*************');
  console.log(formEntries);
  console.log('*************');
  if (loading) return <h1>Cargando...</h1>;

  return (
    <Layout>
      <HeadComponent
        title={`${catId ? 'Editar' : 'Crear'} categoria`}
      />
      <FormComponent
        handleSubmit={handleSubmit}
        fields={formEntries}
        config={formInputs}
      />
    </Layout>
  );
};

CategoryCreate.propTypes = {
  match: PropTypes.object.isRequired,
  getCategory: PropTypes.func.isRequired,
  setCategoriesLoading: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  createCategory: PropTypes.func.isRequired,
  updateCategory: PropTypes.func.isRequired,
  menus: PropTypes.array.isRequired,
  initForm: PropTypes.func.isRequired,
  category: PropTypes.object,
};

CategoryCreate.defaultProps = {
  category: {
    name: '',
    orden: '1',
    descripcion: '',
    // menus = [],
  },
};

export default connect(selectors.createSelector, createDispatcher)(CategoryCreate);

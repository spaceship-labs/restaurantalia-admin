import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Layout from '../layout';
import formHooks from '../../hooks/form';
import HeadComponent from '../../components/head';
import FormComponent from '../../components/form';
import { createDispatcher } from './dispatcher';
import selectors from './selectors';

/* class FormDishContainer extends Component {
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

FormDishContainer.propTypes = {
  match: PropTypes.object.isRequired,
  getDish: PropTypes.func.isRequired,
  setDishesLoading: PropTypes.func.isRequired,
  createDish: PropTypes.func.isRequired,
  updateDish: PropTypes.func.isRequired,
};

export default connect(null, createDispatcher)(FormDishContainer); */

const formInputs = {
  name: {
    attr: 'name',
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
  precio: {
    attr: 'precio',
    label: 'Precio',
    type: 'number',
    isRequired: true,
    error: false,
  },
  cantidad: {
    attr: 'cantidad',
    label: 'Cantidad',
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
  categorias: {
    attr: 'categorias',
    label: 'Categorias',
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
};

const { useFormInput } = formHooks;

const DishCreate = ({
  loading, dish, match, getDish, setDishesLoading,
}) => {
  const nameField = useFormInput(formInputs.name);
  const ordenField = useFormInput(formInputs.orden);
  const precioField = useFormInput(formInputs.precio);
  const cantidadField = useFormInput(formInputs.cantidad);
  const descripcionField = useFormInput(formInputs.descripcion);
  // const [categorias, setCategorias] = useFormInput(formInputs.categorias);

  const { params: { id: dishId } } = match;

  useEffect(() => {
    console.log('Entra');
    if (dishId) {
      console.log('Dispara');
      getDish(dishId);
      setDishesLoading({ loading: true });
    }
  }, [dishId]);

  useEffect(() => {
    console.log('Entra2');
    const {
      nombre,
      orden,
      precio,
      cantidad,
      descripcion,
      // categorias = [],
    } = dish;
    nameField.setValue(nombre);
    ordenField.setValue(orden);
    precioField.setValue(precio);
    cantidadField.setValue(cantidad);
    descripcionField.setValue(descripcion);
  }, [loading]);

  const formEntries = [
    nameField,
    ordenField,
    precioField,
    cantidadField,
    descripcionField,
  ];

  return (
    <Layout>
      <HeadComponent
        title="Crear platillo"
      />
      <FormComponent
        handleSubmit={(e) => {
          e.preventDefault();
          console.log('Submit!');
        }}
        fields={formEntries}
      />
    </Layout>
  );
};

DishCreate.propTypes = {
  match: PropTypes.object.isRequired,
  getDish: PropTypes.func.isRequired,
  setDishesLoading: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  // createDish: PropTypes.func.isRequired,
  // updateDish: PropTypes.func.isRequired,
  dish: PropTypes.object,
};

DishCreate.defaultProps = {
  dish: {
    name: '',
    orden: '1',
    precio: '',
    cantidad: '',
    descripcion: '',
    // categorias = [],
  },
};

export default connect(selectors.createSelector, createDispatcher)(DishCreate);

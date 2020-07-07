import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Layout from '../layout';
import HeadComponent from '../../components/head';
import FormComponent from '../../components/form';
import LoadingComponent from '../../components/loading';
import ImageZoneComponent from '../../components/imageupload';
import { createDispatcher } from './dispatcher';
import selectors from './selectors';

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
  },
};
// multimedia
const imageInputs = {
  imagen: {
    attr: 'imagen',
    label: 'Imagen',
    multiple: false,
  },
  logo: {
    attr: 'imagen',
    label: 'Imagen',
    multiple: true,
  },
};

const createChangeCb = (currentVal, setCb) => (newVal) => setCb({ ...currentVal, value: newVal });

const DishCreate = ({
  loading,
  dish,
  match,
  getDish,
  setDishesLoading,
  categorias,
  updateDish,
  createDish,
  initForm,
}) => {
  const [nameField, setName] = useState({ name: 'name', value: '' });
  const [ordenField, setOrden] = useState({ name: 'orden', value: '' });
  const [precioField, setPrecio] = useState({ name: 'precio', value: '' });
  const [cantidadField, setCantidad] = useState({ name: 'cantidad', value: '' });
  const [descripcionField, setDescripcion] = useState({ name: 'descripcion', value: '' });
  const [categoriasField, setCategorias] = useState({ name: 'categorias', value: [] });
  // multimedia
  const [imagenField, setImagen] = useState({ name: 'imagen', value: [], uploaded: [] });
  const [logoField, setLogo] = useState({ name: 'logo', value: [], uploaded: [] });

  const { params: { id: dishId } } = match;

  useEffect(() => {
    initForm();
  }, []);

  useEffect(() => {
    if (dishId) {
      getDish(dishId);
      setDishesLoading({ loading: true });
    }
  }, [dishId]);

  useEffect(() => {
    const {
      nombre,
      orden,
      precio,
      cantidad,
      descripcion,
      categorias: cats = [],
      imagen,
      logo,
    } = dish;
    // console.log('/////////////////////');
    // console.log(dish);
    // console.log('/////////////////////');
    setName({ ...nameField, value: nombre });
    setOrden({ ...ordenField, value: orden });
    setPrecio({ ...precioField, value: precio });
    setCantidad({ ...cantidadField, value: cantidad });
    setDescripcion({ ...descripcionField, value: descripcion });
    setCategorias({ ...categoriasField, value: cats });
    // multimedia
    setImagen({ ...imagenField, uploaded: imagen || [] });
    setLogo({ ...logoField, uploaded: logo || [] });
  }, [loading, dish]);

  function handleSubmit(e) {
    e.preventDefault();
    const actionPayload = {
      nameField,
      ordenField,
      precioField,
      cantidadField,
      descripcionField,
      categoriasField,
    };
    if (dishId) updateDish({ ...actionPayload, dishId });
    else createDish(actionPayload);
  }

  function handleSubmitMultimedia() {
    const actionPayload = {
      imagenField,
      logoField,
      dishId,
    };
    // se llama el action que creara los elementos
    // setDishesLoading({ loading: true });
    console.log('UPLOAD', actionPayload);
  }

  const formEntries = [
    { ...nameField, change: createChangeCb(nameField, setName) },
    { ...ordenField, change: createChangeCb(ordenField, setOrden) },
    { ...precioField, change: createChangeCb(precioField, setPrecio) },
    { ...cantidadField, change: createChangeCb(cantidadField, setCantidad) },
    { ...descripcionField, change: createChangeCb(descripcionField, setDescripcion) },
    {
      ...categoriasField, change: createChangeCb(categoriasField, setCategorias), items: categorias,
    },
  ];

  const multimediaFields = [
    { ...imagenField, change: createChangeCb(imagenField, setImagen) },
    { ...logoField, change: createChangeCb(logoField, setLogo) },
  ];

  // console.log('*************');
  // console.log(formEntries);
  // console.log('*************');
  // if (loading) return <h1>Cargando...</h1>;

  return (
    <Layout>
      <HeadComponent
        title={`${dishId ? 'Editar' : 'Crear'} platillo`}
      />
      {!loading && (
      <FormComponent
        handleSubmit={handleSubmit}
        fields={formEntries}
        config={formInputs}
      />
      )}
      {!loading
        && dishId
        && (
        <ImageZoneComponent
          handleSubmit={handleSubmitMultimedia}
          fields={multimediaFields}
          config={imageInputs}
        />
        )}
      <LoadingComponent open={loading} />
    </Layout>
  );
};

DishCreate.propTypes = {
  match: PropTypes.object.isRequired,
  getDish: PropTypes.func.isRequired,
  setDishesLoading: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  createDish: PropTypes.func.isRequired,
  updateDish: PropTypes.func.isRequired,
  categorias: PropTypes.array.isRequired,
  initForm: PropTypes.func.isRequired,
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

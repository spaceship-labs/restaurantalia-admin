import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Layout from '../layout';
import HeadComponent from '../../components/head';
import FormComponent from '../../components/form';
import ImageZoneComponent from '../../components/imageupload';
import DeleteSectionComponent from '../../components/delete';
import { createDispatcher } from './dispatcher';
import selectors from './selectors';

const formInputs = {
  activo: {
    attr: 'activo',
    label: 'Activo',
    type: 'bool',
    isRequired: false,
    error: false,
  },
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
};

const createChangeCb = (currentVal, setCb) => (newVal) => setCb({ ...currentVal, value: newVal });

const DishCreate = ({
  loading,
  dish,
  match,
  getDish,
  categorias,
  updateDish,
  createDish,
  initForm,
  uploadDishImage,
  deleteDishImage,
  deleteDish,
}) => {
  const [nameField, setName] = useState({ name: 'name', value: '' });
  const [activoField, setActivo] = useState({ name: 'activo', value: false });
  const [ordenField, setOrden] = useState({ name: 'orden', value: '' });
  const [precioField, setPrecio] = useState({ name: 'precio', value: '' });
  const [cantidadField, setCantidad] = useState({ name: 'cantidad', value: '' });
  const [descripcionField, setDescripcion] = useState({ name: 'descripcion', value: '' });
  const [categoriasField, setCategorias] = useState({ name: 'categorias', value: [] });
  // multimedia
  const [imagenField, setImagen] = useState({ name: 'imagen', value: [], uploaded: [] });

  const { params: { id: dishId } } = match;

  useEffect(() => {
    initForm();
  }, []);

  useEffect(() => {
    if (dishId) {
      getDish(dishId);
    }
  }, [dishId]);

  useEffect(() => {
    const {
      nombre,
      activo,
      orden,
      precio,
      cantidad,
      descripcion,
      categorias: cats = [],
      imagen,
    } = dish;
    setName({ ...nameField, value: nombre });
    setActivo({ ...activoField, value: activo || false });
    setOrden({ ...ordenField, value: orden });
    setPrecio({ ...precioField, value: precio });
    setCantidad({ ...cantidadField, value: cantidad });
    setDescripcion({ ...descripcionField, value: descripcion });
    setCategorias({ ...categoriasField, value: cats });
    // multimedia
    setImagen({ ...imagenField, uploaded: imagen || [] });
  }, [loading, dish]);

  function handleDelete() {
    console.log('DELETE ELEMENT', dishId);
    if (dishId) {
      deleteDish({ dishId });
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    const actionPayload = {
      nameField,
      activoField,
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
      files: imagenField.value,
      dishId,
    };
    // se llama el action que creara los elementos
    uploadDishImage(actionPayload);
  }

  function handleDeleteImage(fileId) {
    deleteDishImage({ fileId, dishId });
  }

  const formEntries = [
    { ...activoField, change: createChangeCb(activoField, setActivo) },
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
  ];

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
            handleDeleteImage={handleDeleteImage}
            handleSubmit={handleSubmitMultimedia}
            fields={multimediaFields}
            config={imageInputs}
          />
        )}
      {!loading && dishId && <DeleteSectionComponent onDelete={handleDelete} />}
    </Layout>
  );
};

DishCreate.propTypes = {
  match: PropTypes.object.isRequired,
  getDish: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  createDish: PropTypes.func.isRequired,
  updateDish: PropTypes.func.isRequired,
  categorias: PropTypes.array.isRequired,
  initForm: PropTypes.func.isRequired,
  uploadDishImage: PropTypes.func.isRequired,
  deleteDishImage: PropTypes.func.isRequired,
  dish: PropTypes.object,
  deleteDish: PropTypes.func.isRequired,
};

DishCreate.defaultProps = {
  dish: {
    name: '',
    orden: '1',
    precio: '',
    cantidad: '',
    descripcion: '',
  },
};

export default connect(selectors.createSelector, createDispatcher)(DishCreate);

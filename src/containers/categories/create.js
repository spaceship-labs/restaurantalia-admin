import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import HeadComponent from '../../components/head';
import FormComponent from '../../components/form';
import LoadingComponent from '../../components/loading';
import { createDispatcher } from './dispatcher';
import Layout from '../layout';
import selectors from './selectors';

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
      setCategoriesLoading({ loading: true });
      getCategory(catId);
    }
  }, [catId]);

  useEffect(() => {
    const {
      nombre,
      orden,
      descripcion,
      menus: ms = [],
    } = category;
    // console.log('/////////////////////');
    // console.log(loading, category);
    // console.log('/////////////////////');
    setName({ ...nombreField, value: nombre });
    setOrden({ ...ordenField, value: orden });
    setDescripcion({ ...descripcionField, value: descripcion });
    setmenus({ ...menusField, value: ms });
  }, [loading, category]);

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

  // console.log('*************');
  // console.log(formEntries);
  // console.log('*************');
  // if (loading) return <h1>Cargando...</h1>;

  return (
    <Layout>
      <HeadComponent
        title={`${catId ? 'Editar' : 'Crear'} categoria`}
      />
      {!loading && (
      <FormComponent
        handleSubmit={handleSubmit}
        fields={formEntries}
        config={formInputs}
      />
      )}
      <LoadingComponent open={loading} />
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

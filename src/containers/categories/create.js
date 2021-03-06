import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import HeadComponent from '../../components/head';
import FormComponent from '../../components/form';
import ImageZoneComponent from '../../components/imageupload';
import DeleteSectionComponent from '../../components/delete';
import { createDispatcher } from './dispatcher';
import Layout from '../layout';
import selectors from './selectors';

const formInputs = {
  activo: {
    attr: 'activo',
    label: 'Activo',
    type: 'bool',
    isRequired: false,
    error: false,
  },
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
// multimedia
const imageInputs = {
  imagen: {
    attr: 'imagen',
    label: 'Imagen',
    multiple: false,
  },
};

const createChangeCb = (currentVal, setCb) => (newVal) => setCb({ ...currentVal, value: newVal });

const CategoryCreate = ({
  loading,
  category,
  match,
  getCategory,
  menus,
  updateCategory,
  createCategory,
  initForm,
  uploadCategoryImage,
  deleteCategoryImage,
  deleteCategory,
}) => {
  const [nombreField, setName] = useState({ name: 'nombre', value: '' });
  const [activoField, setActivo] = useState({ name: 'activo', value: false });
  const [ordenField, setOrden] = useState({ name: 'orden', value: '' });
  const [descripcionField, setDescripcion] = useState({ name: 'descripcion', value: '' });
  const [menusField, setmenus] = useState({ name: 'menus', value: [] });
  // multimedia
  const [imagenField, setImagen] = useState({ name: 'imagen', value: [], uploaded: [] });

  const { params: { id: catId } } = match;

  useEffect(() => {
    initForm();
  }, []);

  useEffect(() => {
    if (catId) {
      getCategory(catId);
    }
  }, [catId]);

  useEffect(() => {
    const {
      nombre,
      activo,
      orden,
      descripcion,
      menus: ms = [],
      imagen,
    } = category;
    console.log('CAT', category);
    setActivo({ ...activoField, value: activo || false });
    setName({ ...nombreField, value: nombre });
    setOrden({ ...ordenField, value: orden });
    setDescripcion({ ...descripcionField, value: descripcion });
    setmenus({ ...menusField, value: ms });
    // multimedia
    setImagen({ ...imagenField, uploaded: imagen || [] });
  }, [loading, category]);

  function handleDelete() {
    console.log('DELETE ELEMENT', catId);
    if (catId) {
      deleteCategory({ catId });
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    const actionPayload = {
      nombreField,
      activoField,
      ordenField,
      descripcionField,
      menusField,
    };
    if (catId) updateCategory({ ...actionPayload, catId });
    else createCategory(actionPayload);
  }

  function handleSubmitMultimedia() {
    const actionPayload = {
      files: imagenField.value,
      catId,
    };
    // se llama el action que creara los elementos
    uploadCategoryImage(actionPayload);
  }

  function handleDeleteImage(fileId) {
    deleteCategoryImage({ fileId, catId });
  }

  const formEntries = [
    { ...activoField, change: createChangeCb(activoField, setActivo) },
    { ...nombreField, change: createChangeCb(nombreField, setName) },
    { ...ordenField, change: createChangeCb(ordenField, setOrden) },
    { ...descripcionField, change: createChangeCb(descripcionField, setDescripcion) },
    { ...menusField, change: createChangeCb(menusField, setmenus), items: menus },
  ];

  const multimediaFields = [
    { ...imagenField, change: createChangeCb(imagenField, setImagen) },
  ];

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
      {!loading
        && catId
        && (
          <ImageZoneComponent
            handleDeleteImage={handleDeleteImage}
            handleSubmit={handleSubmitMultimedia}
            fields={multimediaFields}
            config={imageInputs}
          />
        )}
      {!loading && catId && <DeleteSectionComponent onDelete={handleDelete} />}
    </Layout>
  );
};

CategoryCreate.propTypes = {
  match: PropTypes.object.isRequired,
  getCategory: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  createCategory: PropTypes.func.isRequired,
  updateCategory: PropTypes.func.isRequired,
  menus: PropTypes.array.isRequired,
  initForm: PropTypes.func.isRequired,
  category: PropTypes.object,
  uploadCategoryImage: PropTypes.func.isRequired,
  deleteCategoryImage: PropTypes.func.isRequired,
  deleteCategory: PropTypes.func.isRequired,
};

CategoryCreate.defaultProps = {
  category: {
    name: '',
    orden: '1',
    descripcion: '',
  },
};

export default connect(selectors.createSelector, createDispatcher)(CategoryCreate);

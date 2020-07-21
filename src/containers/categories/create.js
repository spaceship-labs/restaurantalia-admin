import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import HeadComponent from '../../components/head';
import FormComponent from '../../components/form';
import LoadingComponent from '../../components/loading';
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
  },
  nombre: {
    attr: 'nombre',
    label: 'Nombre*',
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
    multiline: true,
    error: false,
  },
  menus: {
    attr: 'menus',
    label: 'Menus*',
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

const createChangeCb = (currentVal, setCb, setConfigOnChange) => (newVal, e) => {
  setConfigOnChange(currentVal.name, e);
  setCb({
    ...currentVal, value: newVal,
  });
};

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
  uploadCategoryImage,
  deleteCategoryImage,
  deleteCategory,
}) => {
  const [configInputs, setConfigInputs] = useState(formInputs);
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
      setCategoriesLoading({ loading: true });
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
    // console.log('CAT', category);
    setActivo({ ...activoField, value: activo || false });
    setName({ ...nombreField, value: nombre });
    setOrden({ ...ordenField, value: orden });
    setDescripcion({ ...descripcionField, value: descripcion || '' });
    setmenus({ ...menusField, value: ms });
    // multimedia
    setImagen({ ...imagenField, uploaded: imagen || [] });
  }, [loading, category]);

  function handleDelete() {
    // console.log('DELETE ELEMENT', catId);
    if (catId) {
      deleteCategory({ catId });
    }
  }

  function handleSubmit(e, valid, newC) {
    e.preventDefault();
    const actionPayload = {
      nombreField,
      activoField,
      ordenField,
      descripcionField,
      menusField,
    };
    // const valid = false;
    // console.log('NEW CONF', v, newC);
    setConfigInputs(newC);
    if (valid) {
      if (catId) updateCategory({ ...actionPayload, catId });
      else createCategory(actionPayload);
    }
  }

  function handleSubmitMultimedia() {
    const actionPayload = {
      files: imagenField.value,
      catId,
    };
    // se llama el action que creara los elementos
    setCategoriesLoading({ loading: true });
    uploadCategoryImage(actionPayload);
  }

  function handleDeleteImage(fileId) {
    setCategoriesLoading({ loading: true });
    deleteCategoryImage({ fileId, catId });
  }
  function setConfigOnChange(name, newConfig) {
    if (newConfig) setConfigInputs({ ...configInputs, [name]: newConfig });
  }
  const formEntries = [
    {
      ...activoField,
      change: createChangeCb(activoField, setActivo, setConfigOnChange),
    },
    {
      ...nombreField,
      change: createChangeCb(nombreField, setName, setConfigOnChange),
    },
    { ...ordenField, change: createChangeCb(ordenField, setOrden, setConfigOnChange) },
    {
      ...descripcionField,
      change: createChangeCb(descripcionField, setDescripcion, setConfigOnChange),
    },
    {
      ...menusField,
      change: createChangeCb(menusField, setmenus, setConfigOnChange),
      items: menus,
    },
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
          config={configInputs}
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
      <LoadingComponent open={loading} />
      {!loading && catId && <DeleteSectionComponent onDelete={handleDelete} />}
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

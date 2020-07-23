// /* eslint-disable */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Layout from '../layout';
import HeadComponent from '../../components/head';
import FormComponent from '../../components/form';
// import LoadingComponent from '../../components/loading';
import ImageZoneComponent from '../../components/imageupload';
import { formDispatcher } from './dispatcher';
import selectors from './selectors';
// import { inputHandle, isValidForm } from '../../utils/inputvalidation';
// import MessageComponent from '../../components/message';

const formInputs = {
  template: {
    attr: 'template',
    label: 'Template',
    value: '',
    type: 'select-single',
    isRequired: true,
    error: false,
    multiple: false,
  },
};

const imageInputs = {
  logo: {
    attr: 'logo',
    label: 'Logo',
    multiple: false,
  },
  background: {
    attr: 'background',
    label: 'Imagen de Fondo',
    multiple: false,
  },
  images: {
    attr: 'images',
    label: 'Imagenes Decorativas',
    multiple: true,
  },
};

const createChangeCb = (currentVal, setCb) => (newVal) => setCb({ ...currentVal, value: newVal });

const FormMenu = ({
  loading,
  menu,
  match,
  getMenu,
  setMenuLoading,
  templates,
  updateMenu,
  initMenuForm,
  deleteMenuImage,
  uploadImages,
}) => {
  const [logoField, setLogo] = useState({ name: 'logo', value: [], uploaded: [] });
  const [backgroundField, setBackground] = useState({ name: 'background', value: [], uploaded: [] });
  const [templateField, setTemplate] = useState({ name: 'template', value: '' });
  const [imagesField, setImages] = useState({ name: 'images', value: [], uploaded: [] });

  const { params: { id: menuId } } = match;

  useEffect(() => {
    initMenuForm();
  }, []);

  useEffect(() => {
    setMenuLoading({ loading: true });
    getMenu(menuId);
  }, [menuId]);

  useEffect(() => {
    const {
      menus_template: {
        logo = {}, imagenes = [], fondo = {}, template = 0,
      } = {},
    } = menu;

    setLogo({ ...logoField, uploaded: logo || [] });
    setBackground({ ...backgroundField, uploaded: fondo || [] });
    setImages({ ...imagesField, uploaded: imagenes || [] });
    setTemplate({ ...templateField, value: template });
  }, [loading, menu]);

  function handleSubmit(e) {
    e.preventDefault();
    setMenuLoading({ loading: true });
    updateMenu({ template: templateField, menuId });
  }

  function handleDeleteImage(imageId) {
    deleteMenuImage({ fileId: imageId });
  }

  function handleSubmitImage() {
    // console.log('Entra aca');
    // console.log(backgroundField);
    // console.log(imagesField);
    // console.log(logoField);
    setMenuLoading({ loading: true });
    uploadImages({
      fondo: backgroundField,
      imagenes: imagesField,
      logo: logoField,
    });
  }

  const formEntries = [
    { ...templateField, change: createChangeCb(templateField, setTemplate), items: templates },
  ];

  const multimediaFields = [
    { ...logoField, change: createChangeCb(logoField, setLogo) },
    { ...backgroundField, change: createChangeCb(backgroundField, setBackground) },
    { ...imagesField, change: createChangeCb(imagesField, setImages) },
  ];

  return (
    <Layout>
      <HeadComponent
        title="Editar menu"
      />
      <FormComponent
        handleSubmit={handleSubmit}
        fields={formEntries}
        config={formInputs}
      />
      <ImageZoneComponent
        handleDeleteImage={handleDeleteImage}
        handleSubmit={handleSubmitImage}
        fields={multimediaFields}
        config={imageInputs}
      />
      {/* <LoadingComponent open={loading} /> */}
    </Layout>
  );
};

FormMenu.propTypes = {
  loading: PropTypes.bool.isRequired,
  menu: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  getMenu: PropTypes.func.isRequired,
  setMenuLoading: PropTypes.func.isRequired,
  initMenuForm: PropTypes.func.isRequired,
  templates: PropTypes.array.isRequired,
  updateMenu: PropTypes.func.isRequired,
  deleteMenuImage: PropTypes.func.isRequired,
  uploadImages: PropTypes.func.isRequired,
};

export default connect(selectors.formSelector, formDispatcher)(FormMenu);

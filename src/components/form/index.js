import React from 'react';
import PropTypes from 'prop-types';
import { Form } from './index.styled';
import FieldComponent from './field';

const FormComponent = ({ handleSubmit, fields }) => (
  <Form onSubmit={handleSubmit}>
    {fields.map((f) => <FieldComponent field={f} />)}
  </Form>
);

FormComponent.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  fields: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default FormComponent;

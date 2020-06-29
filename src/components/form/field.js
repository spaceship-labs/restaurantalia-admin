import React from 'react';
import PropTypes from 'prop-types';
import TextInputComponent from './text';
import SelectChipInputComponent from './select';
import NumberInputComponent from './number';

const FieldComponent = ({ field, handleChange }) => {
  // something
  if (field.type === 'select') {
    return <SelectChipInputComponent field={field} handleChange={handleChange} />;
  }
  if (field.type === 'number') {
    return <NumberInputComponent field={field} handleChange={handleChange} />;
  }
  return <TextInputComponent field={field} handleChange={handleChange} />;
};

FieldComponent.propTypes = {
  field: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default FieldComponent;

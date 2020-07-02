import React from 'react';
import PropTypes from 'prop-types';
import TextInputComponent from './text';
import SelectChipInputComponent from './select';
import NumberInputComponent from './number';

const FieldComponent = ({ field, handleInputChange }) => {
  if (field.type === 'multiselect') {
    return <SelectChipInputComponent multiple field={field} handleChange={handleInputChange} />;
  }
  if (field.type === 'select') {
    return <SelectChipInputComponent field={field} handleChange={handleInputChange} />;
  }
  if (field.type === 'number') {
    return <NumberInputComponent field={field} handleChange={handleInputChange} />;
  }
  return <TextInputComponent field={field} handleChange={handleInputChange} />;
};

FieldComponent.propTypes = {
  field: PropTypes.object.isRequired,
  handleInputChange: PropTypes.func.isRequired,
};

export default FieldComponent;

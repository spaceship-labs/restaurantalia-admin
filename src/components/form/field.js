import React from 'react';
import PropTypes from 'prop-types';
import TextInputComponent from './text';
import SelectChipInputComponent from './select';
import NumberInputComponent from './number';

const FieldComponent = ({ field }) => {
  // something
  if (field.type === 'select') {
    return <SelectChipInputComponent field={field} />;
  }
  if (field.type === 'number') {
    return <NumberInputComponent field={field} />;
  }
  return <TextInputComponent field={field} />;
};

FieldComponent.propTypes = {
  field: PropTypes.object.isRequired,
};

export default FieldComponent;

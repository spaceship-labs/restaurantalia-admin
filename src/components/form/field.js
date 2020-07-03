import React from 'react';
import PropTypes from 'prop-types';
import TextInputComponent from './text';
import SelectChipInputComponent from './select';
import NumberInputComponent from './number';

const FieldComponent = ({ field, fieldConfig }) => {
  // something
  if (fieldConfig.type === 'select') {
    return <SelectChipInputComponent field={field} fieldConfig={fieldConfig} />;
  }
  if (fieldConfig.type === 'number') {
    return <NumberInputComponent field={field} fieldConfig={fieldConfig} />;
  }
  return <TextInputComponent field={field} fieldConfig={fieldConfig} />;
};

FieldComponent.propTypes = {
  field: PropTypes.object.isRequired,
  fieldConfig: PropTypes.object.isRequired,
};

export default FieldComponent;

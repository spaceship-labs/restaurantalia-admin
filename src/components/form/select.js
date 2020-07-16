import React from 'react';
import PropTypes from 'prop-types';
import {
  FormControl, InputLabel, Select, Input, MenuItem,
} from '@material-ui/core/';

const SelectSingleInputComponent = ({ field, fieldConfig }) => {
  const {
    attr, value, items = [], isRequired, error, change,
  } = field;
  const { label, multiple } = fieldConfig;
  return (
    <FormControl>
      <InputLabel id={attr}>{label}</InputLabel>
      <Select
        labelId={attr}
        id={attr}
        required={isRequired}
        error={error}
        name={attr}
        multiple={multiple}
        value={value}
        onChange={({ target: { value: val } }) => {
          change(val);
        }}
        input={<Input id={attr} />}
      >
        {items.map((item) => (
          <MenuItem key={item.id} value={item.id}>
            {item.nombre}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

SelectSingleInputComponent.propTypes = {
  field: PropTypes.object.isRequired,
  fieldConfig: PropTypes.object.isRequired,
  multiple: PropTypes.bool.isRequired,
};

export default SelectSingleInputComponent;

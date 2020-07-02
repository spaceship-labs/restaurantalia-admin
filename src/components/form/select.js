import React from 'react';
import PropTypes from 'prop-types';
import {
  FormControl, InputLabel, Select, Input, Chip, MenuItem,
} from '@material-ui/core/';

const SelectChipInputComponent = ({ field, handleChange }) => {
  const {
    attr, label, value, items, isRequired, error,
  } = field;
  return (
    <FormControl>
      <InputLabel id={attr}>{label}</InputLabel>
      <Select
        labelId={attr}
        id={attr}
        required={isRequired}
        error={error}
        name={attr}
        multiple
        value={value}
        onChange={handleChange}
        input={<Input id={attr} />}
        renderValue={(selected) => (
          <div>
            {selected.map((v) => (
              <Chip key={v.id} label={v.nombre} />
            ))}
          </div>
        )}
      >
        {items.map((item) => (
          <MenuItem key={item.id} value={item}>
            {item.nombre}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

SelectChipInputComponent.propTypes = {
  field: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default SelectChipInputComponent;

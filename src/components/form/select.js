import React from 'react';
import PropTypes from 'prop-types';
import {
  FormControl, InputLabel, Select, Input, Chip, MenuItem,
} from '@material-ui/core/';

const SelectChipInputComponent = ({ field, handleChange }) => {
  const {
    attr, label, value, items,
  } = field;
  return (
    <FormControl>
      <InputLabel id={attr}>{label}</InputLabel>
      <Select
        labelId={attr}
        id={attr}
        name={attr}
        multiple
        value={value}
        onChange={handleChange}
        input={<Input id={attr} />}
        renderValue={(selected) => (
          <div>
            {selected.map((v) => (
              <Chip key={v} label={v} />
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

import React from 'react';
import PropTypes from 'prop-types';
import {
  FormControl, InputLabel, Select, Input, Chip, MenuItem,
} from '@material-ui/core/';

const MultipleSelectComponent = ({ field, handleChange }) => {
  const {
    attr, value, items, isRequired, error,
  } = field;
  return (
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
  );
};
MultipleSelectComponent.propTypes = {
  field: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
};

const SingleSelectComponent = ({ field, handleChange }) => {
  const {
    attr, value, items, isRequired, error,
  } = field;
  return (
    <Select
      labelId={attr}
      id={attr}
      required={isRequired}
      error={error}
      name={attr}
      value={value}
      onChange={handleChange}
      input={<Input id={attr} />}
    >
      {items.map((item) => (
        <MenuItem key={item.id} value={item.id}>
          {item.nombre}
        </MenuItem>
      ))}
    </Select>
  );
};
SingleSelectComponent.propTypes = {
  field: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
};

const SelectChipInputComponent = ({ field, handleChange, multiple }) => {
  const { attr, label } = field;
  return (
    <FormControl>
      <InputLabel id={attr}>{label}</InputLabel>
      {multiple
        ? <MultipleSelectComponent field={field} handleChange={handleChange} />
        : <SingleSelectComponent field={field} handleChange={handleChange} />}
    </FormControl>
  );
};
SelectChipInputComponent.defaultProps = {
  multiple: false,
};
SelectChipInputComponent.propTypes = {
  field: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
  multiple: PropTypes.bool,
};

export default SelectChipInputComponent;

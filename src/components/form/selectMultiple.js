import React from 'react';
import PropTypes from 'prop-types';
import {
  FormControl, InputLabel, Select, Input, MenuItem, Chip, FormHelperText,
} from '@material-ui/core/';

const SelectChipInputComponent = ({ field, fieldConfig }) => {
  const {
    value, items, change,
  } = field;
  const {
    label, isRequired, attr, error,
  } = fieldConfig;
  const vls = value.map((it) => JSON.stringify(it));
  const its = items.map((it) => JSON.stringify(it));
  return (
    <FormControl error={error}>
      <InputLabel id={attr}>{label}</InputLabel>
      <Select
        labelId={attr}
        id={attr}
        required={isRequired}
        name={attr}
        multiple
        value={vls}
        onChange={({ target: { value: val } }) => {
          const newVal = val.map((it) => JSON.parse(it));
          const e = (isRequired && newVal.length === 0);
          // console.log('e', label, e);
          const newConfig = { ...fieldConfig, error: e };
          change(newVal, newConfig);
        }}
        input={<Input id={attr} />}
        renderValue={(selected) => (
          <div>
            {selected.map((v) => {
              const vObj = JSON.parse(v);
              return (
                <Chip key={vObj.id} label={vObj.nombre} />
              );
            })}
          </div>
        )}
      >
        {its.map((item) => {
          const tt = JSON.parse(item);
          return (
            <MenuItem key={tt.id} value={item}>
              {tt.nombre}
            </MenuItem>
          );
        })}
      </Select>
      {error && <FormHelperText id="component-error-text">Campo requerido</FormHelperText>}
    </FormControl>
  );
};

SelectChipInputComponent.propTypes = {
  field: PropTypes.object.isRequired,
  fieldConfig: PropTypes.object.isRequired,
};

export default SelectChipInputComponent;

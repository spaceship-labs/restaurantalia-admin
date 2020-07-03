import React from 'react';
import PropTypes from 'prop-types';
import {
  FormControl, InputLabel, Select, Input, MenuItem, Chip,
} from '@material-ui/core/';

const SelectChipInputComponent = ({ field, fieldConfig }) => {
  const {
    attr, value, items, isRequired, error, change,
  } = field;
  const { label } = fieldConfig;
  const vls = value.map((it) => JSON.stringify(it));
  const its = items.map((it) => JSON.stringify(it));
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
        value={vls}
        onChange={({ target: { value: val } }) => {
          // console.log(';;;;;;;;;;;;;;;;;');
          // console.log(val);
          // console.log(';;;;;;;;;;;;;;;;;');
          const newVal = val.map((it) => JSON.parse(it));
          change(newVal);
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
    </FormControl>
  );
};

SelectChipInputComponent.propTypes = {
  field: PropTypes.object.isRequired,
  fieldConfig: PropTypes.object.isRequired,
};

export default SelectChipInputComponent;

import React from 'react';
import PropTypes from 'prop-types';
import { FormControlLabel, Switch } from '@material-ui/core/';
import { RowForm } from './index.styled';

const BoolInputComponent = ({ field, fieldConfig }) => {
  const {
    label, attr,
  } = fieldConfig;
  const { value, change } = field;
  return (
    <RowForm fullwidth>
      <FormControlLabel
        control={(
          <Switch
            checked={value}
            onChange={change}
            name={attr}
            color="primary"
          />
      )}
        label={label}
      />
    </RowForm>
  );
};

BoolInputComponent.propTypes = {
  field: PropTypes.object.isRequired,
  fieldConfig: PropTypes.object.isRequired,
};

export default BoolInputComponent;

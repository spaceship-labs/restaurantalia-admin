import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Divider, Button, Paper } from '@material-ui/core';
import { Form, FormFooter } from './index.styled';
import FieldComponent from './field';
import MessageComponent from '../message';

const FormComponent = ({
  handleSubmit, fields, config,
}) => {
  const [error, setError] = useState(false);
  const onSubmit = (e) => {
    e.preventDefault();
    const newConfig = { ...config };
    const valid = fields.reduce((iv, f) => {
      const { type, isRequired } = config[f.name];
      const { value } = f;
      if (isRequired) {
        let newIV = iv;
        if (type === 'select') {
          newIV = value.length === 0 ? false : newIV;
          newConfig[f.name].error = (value.length === 0);
        } else if (type === 'number') {
          // eslint-disable-next-line no-restricted-globals
          newIV = (parseFloat(value) < 0 && isFinite(value)) ? false : newIV;
          // eslint-disable-next-line no-restricted-globals
          newConfig[f.name].error = (parseFloat(value) < 0 && isFinite(value));
        } else {
          newIV = value === '' ? false : newIV;
          newConfig[f.name].error = (value === '');
        }
        return newIV;
      }
      return iv;
    }, true);
    // console.log('NEW CONF', valid, newConfig);
    handleSubmit(e, valid, newConfig);
    if (!valid) {
      setError(true);
    }
  };
  return (
    <Paper>
      <Form onSubmit={onSubmit} noValidate autoComplete="off">
        {fields.map((f) => (
          <FieldComponent
            key={config[f.name].attr}
            field={f}
            fieldConfig={config[f.name]}
          />
        ))}
        <FormFooter>
          <Divider variant="fullWidth" />
          <br />
          <Button type="submit" color="primary" variant="contained">
            Guardar
          </Button>
        </FormFooter>
      </Form>
      <MessageComponent
        open={error}
        type="error"
        message="Favor de revisar todos los campos requeridos"
        handleClose={() => setError(false)}
      />
    </Paper>
  );
};

FormComponent.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  fields: PropTypes.array.isRequired,
  config: PropTypes.object.isRequired,
};

export default FormComponent;

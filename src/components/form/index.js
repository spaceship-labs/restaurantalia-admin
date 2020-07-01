import React from 'react';
import PropTypes from 'prop-types';
import { Divider, Button, Paper } from '@material-ui/core';
import { Form, FormFooter } from './index.styled';
import FieldComponent from './field';

const FormComponent = ({ handleSubmit, fields, handleInputChange }) => (
  <Paper>
    <Form onSubmit={handleSubmit} noValidate autoComplete="off">
      {Object.keys(fields).map((f) => (
        <FieldComponent
          key={fields[f].attr}
          handleInputChange={handleInputChange}
          field={fields[f]}
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
  </Paper>
);

FormComponent.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  fields: PropTypes.object.isRequired,
  handleInputChange: PropTypes.func.isRequired,
};

export default FormComponent;

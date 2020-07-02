import React from 'react';
import PropTypes from 'prop-types';
import { Divider, Button, Paper } from '@material-ui/core';
import { Form, FormFooter } from './index.styled';
import FieldComponent from './field';

const FormComponent = ({ handleSubmit, fields }) => (
  <Paper>
    <Form onSubmit={handleSubmit} noValidate autoComplete="off">
      {fields.map((f) => (
        <FieldComponent
          key={f.attr}
          field={f}
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
  fields: PropTypes.array.isRequired,
};

export default FormComponent;

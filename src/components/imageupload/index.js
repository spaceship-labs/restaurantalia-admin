import React from 'react';
import PropTypes from 'prop-types';
import {
  CardContent, Typography, CardActions, Button,
} from '@material-ui/core';

import { UploadWrapper, UploadItem } from './index.styled';
import DropZoneComponent from './dropzone';
import ImageListComponent from './imagelist';

const ImageZoneComponent = ({
  fields, config, title, handleSubmit, handleDeleteImage,
}) => {
  console.log('TITLE', title, config);
  return (
    <UploadWrapper>
      <h3>{title}</h3>
      {fields.map((f) => (
        <UploadItem multiple={config[f.name].multiple} key={config[f.name].attr}>
          <CardContent>
            <Typography variant="h5" component="h4">{config[f.name].label}</Typography>
            <br />
            <DropZoneComponent field={f} config={config[f.name]} />
            <ImageListComponent
              handleDeleteImage={handleDeleteImage}
              field={f}
              config={config[f.name]}
            />
          </CardContent>
          <CardActions>
            <Button onClick={handleSubmit} size="small" color="primary">Guardar</Button>
          </CardActions>
        </UploadItem>
      ))}
    </UploadWrapper>
  );
};

ImageZoneComponent.defaultProps = {
  title: 'Multimedia',
};

ImageZoneComponent.propTypes = {
  fields: PropTypes.arrayOf(PropTypes.object).isRequired,
  config: PropTypes.object.isRequired,
  title: PropTypes.string,
  handleSubmit: PropTypes.func.isRequired,
  handleDeleteImage: PropTypes.func.isRequired,
};

export default ImageZoneComponent;

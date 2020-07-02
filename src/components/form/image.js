import React from 'react';
import PropTypes from 'prop-types';
import { DropzoneArea } from 'material-ui-dropzone';
import ImageIcon from '@material-ui/icons/Image';
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';
import { ImageFormWrapper } from './index.styled';
import ImageListComponent from './imagelist';

const ImageInputComponent = ({ field, handleChange }) => {
  const {
    label, error, multiple, initArray,
  } = field;
  const filesLimit = 10;
  const showInput = (initArray.length <= (multiple ? filesLimit : 0));
  return (
    <ImageFormWrapper>
      <p>
        {multiple ? <PhotoLibraryIcon /> : <ImageIcon />}
        {' '}
        {label}
      </p>
      {showInput && (
        <DropzoneArea
          acceptedFiles={['image/*']}
          dropzoneText="Arrastra tus imagenes o da click"
          filesLimit={multiple ? filesLimit : 1}
          onChange={(files) => {
            console.log('files', files);
            handleChange(files, 'file');
          }}
        />
      )}
      {error && <p>Error en alguna imagen, favor de revisarlas</p>}
      <ImageListComponent initArray={initArray} multiple={multiple} />
    </ImageFormWrapper>
  );
};

ImageInputComponent.propTypes = {
  field: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default ImageInputComponent;

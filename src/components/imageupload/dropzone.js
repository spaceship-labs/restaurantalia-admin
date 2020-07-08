import React from 'react';
import PropTypes from 'prop-types';
import { DropzoneAreaBase } from 'material-ui-dropzone';

const DropZoneComponent = ({ field, config }) => {
  const { uploaded, change, value } = field;
  const { multiple } = config;
  const maxFiles = 5 - uploaded.length;
  const showInput = multiple ? (maxFiles > 0) : uploaded.length === 0;
  const onAdd = (newFiles) => {
    change(newFiles);
  };
  const onDelete = (deletedFile) => {
    change([]);
    console.log('DELETE', deletedFile);
  };
  return (
    <>
      {showInput
        && (
        <DropzoneAreaBase
          fileObjects={value}
          acceptedFiles={['image/png', 'image/jpg', 'image/jpeg']}
          filesLimit={multiple ? maxFiles : 1}
          onAdd={onAdd}
          onDelete={onDelete}
        />
        )}
    </>
  );
};

DropZoneComponent.propTypes = {
  field: PropTypes.object.isRequired,
  config: PropTypes.object.isRequired,
};

export default DropZoneComponent;

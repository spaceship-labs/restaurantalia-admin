import React from 'react';
import PropTypes from 'prop-types';
import DeleteIcon from '@material-ui/icons/Delete';
import { UploadList, ImageItem, DeleteButton } from './index.styled';

const uploadsUrl = 'http://3.130.7.153:1338';

const ImageListComponent = ({ field, config, handleDeleteImage }) => {
  const { uploaded } = field;
  const { multiple } = config;
  console.log('MEDIA', field, config);
  // eslint-disable-next-line react/prop-types
  const deleteButton = ({ id }) => (
    <DeleteButton
      onClick={() => { handleDeleteImage(id); }}
      aria-label="delete"
      size="small"
      color="secondary"
    >
      <DeleteIcon fontSize="small" />
    </DeleteButton>
  );
  if (uploaded.length === 0) {
    return null;
  }
  return (
    <UploadList>
      {multiple && uploaded.map((u) => (
        <ImageItem multiple>
          {deleteButton(u)}
          <img alt={u.name} src={`${uploadsUrl}${u.url}`} />
        </ImageItem>
      ))}
      {!multiple && (
        <ImageItem>
          {deleteButton(uploaded)}
          <img alt={uploaded.name} src={`${uploadsUrl}${uploaded.url}`} />
        </ImageItem>
      )}
    </UploadList>
  );
};

ImageListComponent.propTypes = {
  field: PropTypes.object.isRequired,
  config: PropTypes.object.isRequired,
  handleDeleteImage: PropTypes.func.isRequired,
};

export default ImageListComponent;

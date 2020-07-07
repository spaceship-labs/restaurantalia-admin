import React from 'react';
import PropTypes from 'prop-types';
import DeleteIcon from '@material-ui/icons/Delete';
import { UploadList, ImageItem, DeleteButton } from './index.styled';

const uploadsUrl = 'http://3.130.7.153:1338';

const ImageListComponent = ({ field, config }) => {
  const { uploaded } = field;
  const { multiple } = config;
  console.log('MEDIA', field, config);
  const deleteButton = (
    <DeleteButton variant="contained" aria-label="delete" size="small" color="secondary">
      <DeleteIcon fontSize="small" />
    </DeleteButton>
  );
  return (
    <UploadList>
      { multiple && uploaded.map((u) => (
        <ImageItem multiple>
          {deleteButton}
          <img alt={u.name} src={`${uploadsUrl}${u.url}`} />
        </ImageItem>
      ))}
      {!multiple && (
        <ImageItem>
          {deleteButton}
          <img alt={uploaded.name} src={`${uploadsUrl}${uploaded.url}`} />
        </ImageItem>
      )}
    </UploadList>
  );
};

ImageListComponent.propTypes = {
  field: PropTypes.object.isRequired,
  config: PropTypes.object.isRequired,
};

export default ImageListComponent;

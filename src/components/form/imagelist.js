import React from 'react';
import PropTypes from 'prop-types';
import { ImageList } from './index.styled';

const uploadsUrl = 'http://3.130.7.153:1338';

const ImageListComponent = ({ initArray, multiple }) => (
  <ImageList multiple={multiple}>
    {initArray.map((image) => (
      <p>
        <img alt={image.name} src={`${uploadsUrl}${image.url}`} />
      </p>
    ))}
  </ImageList>
);

ImageListComponent.defaultProps = {
  multiple: false,
};

ImageListComponent.propTypes = {
  initArray: PropTypes.arrayOf(PropTypes.object).isRequired,
  multiple: PropTypes.bool,
};

export default ImageListComponent;

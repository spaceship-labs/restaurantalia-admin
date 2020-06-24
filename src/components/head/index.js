import React from 'react';
import PropTypes from 'prop-types';
import { Typography, Divider } from '@material-ui/core/';
import { HeadContainer } from './index.styled';

const HeadComponent = ({ title, description }) => (
  <>
    <HeadContainer>
      <Typography gutterBottom variant="h3" component="h3">
        {title}
      </Typography>
      <Typography variant="body2" color="textPrimary" component="p">
        {description}
      </Typography>
      <br />
      <Divider />
    </HeadContainer>
  </>
);

HeadComponent.defaultProps = {
  description: '',
};

HeadComponent.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
};

export default HeadComponent;

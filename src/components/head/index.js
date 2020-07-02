import React from 'react';
import PropTypes from 'prop-types';
import {
  Typography, Divider, Fab, Grid,
} from '@material-ui/core/';
import AddIcon from '@material-ui/icons/Add';
import { HeadContainer } from './index.styled';

const HeadComponent = ({ title, description, createUrl }) => (
  <>
    <HeadContainer>
      <Grid container spacing={3} justify="space-between" alignItems="center">
        <Grid item>
          <Typography gutterBottom variant="h3" component="h3">
            {title}
          </Typography>
          <Typography variant="body2" color="textPrimary" component="p">
            {description}
          </Typography>
        </Grid>
        <Grid>
          {createUrl && (
            <Fab href={createUrl} color="primary" aria-label="add" variant="extended">
              <AddIcon />
              {' '}
              Agregar
            </Fab>
          )}
        </Grid>
      </Grid>
      <br />
      <Divider />
    </HeadContainer>
  </>
);

HeadComponent.defaultProps = {
  description: '',
  createUrl: '',
};

HeadComponent.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  createUrl: PropTypes.string,
};

export default HeadComponent;

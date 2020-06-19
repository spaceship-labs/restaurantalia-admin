import React from 'react';
import {
  Link,
  Typography,
} from '@material-ui/core/';

const CopyrightComponent = () => (
  <Typography variant="body2" color="textSecondary" align="center">
    {'Copyright © '}
    <Link color="inherit" href="http://spaceshiplabs.com/">
      Spaceshiplabs
    </Link>
    {' '}
    {new Date().getFullYear()}
    {'.'}
  </Typography>
);

export default CopyrightComponent;

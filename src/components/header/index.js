import React from 'react';
import {
  Typography, IconButton, Button,
} from '@material-ui/core/';
import MenuIcon from '@material-ui/icons/Menu';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import PropTypes from 'prop-types';
import { AppBarCustom, Header, TitleWrapper } from './index.styled';

const HeaderComponent = ({ sidebarToggle, handleToggleSidebar, logout }) => (
  <AppBarCustom open={sidebarToggle} position="fixed">
    <Header>
      <IconButton
        edge="start"
        color="inherit"
        aria-label="menu"
        onClick={handleToggleSidebar}
      >
        <MenuIcon />
      </IconButton>
      <TitleWrapper>
        <Typography variant="h6">
          Restaurantalia
        </Typography>
      </TitleWrapper>
      <Button onClick={logout} color="inherit"><ExitToAppIcon /></Button>
    </Header>
  </AppBarCustom>
);

HeaderComponent.propTypes = {
  handleToggleSidebar: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  sidebarToggle: PropTypes.bool.isRequired,
};

export default HeaderComponent;

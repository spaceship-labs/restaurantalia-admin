import React from 'react';
import PropTypes from 'prop-types';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import {
  Divider, IconButton, List, ListItem, ListItemIcon, ListItemText,
} from '@material-ui/core/';
// import { makeStyles } from '@material-ui/core/styles';
import {
  CustomDrawer, DrawerHeader,
} from './index.styled';

const SidebarComponent = ({ sidebarToggle, handleToggleSidebar }) => (
  <>
    <CustomDrawer
      variant="persistent"
      anchor="left"
      open={sidebarToggle}
    >
      <DrawerHeader>
        <IconButton onClick={handleToggleSidebar}>
          <ChevronLeftIcon />
        </IconButton>
      </DrawerHeader>
      <Divider />
      <List>
        {['Menus', 'Categorias', 'Platillos'].map((text) => (
          <ListItem button key={text}>
            <ListItemIcon><InboxIcon /></ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </CustomDrawer>
  </>
);

SidebarComponent.propTypes = {
  sidebarToggle: PropTypes.bool.isRequired,
  handleToggleSidebar: PropTypes.func.isRequired,
};

export default SidebarComponent;

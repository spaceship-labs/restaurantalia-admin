import React from 'react';
import PropTypes from 'prop-types';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ExtensionIcon from '@material-ui/icons/Extension';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import {
  Divider, IconButton, List, ListItem, ListItemIcon, ListItemText,
} from '@material-ui/core/';
// import { makeStyles } from '@material-ui/core/styles';
import {
  CustomDrawer, DrawerHeader,
} from './index.styled';

const SidebarComponent = ({ sidebarToggle, handleToggleSidebar }) => {
  const menuItems = [
    {
      label: 'Menus',
      link: '/menus',
      icon: <MenuBookIcon />,
    },
    {
      label: 'Categorias',
      link: '/categorias',
      icon: <ExtensionIcon />,
    },
    {
      label: 'Platillos',
      link: '/platillos',
      icon: <FastfoodIcon />,
    },
  ];
  return (
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
          {menuItems.map((item) => (
            <ListItem button component="a" href={item.link} key={item.link}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItem>
          ))}
        </List>
      </CustomDrawer>
    </>
  );
};

SidebarComponent.propTypes = {
  sidebarToggle: PropTypes.bool.isRequired,
  handleToggleSidebar: PropTypes.func.isRequired,
};

export default SidebarComponent;

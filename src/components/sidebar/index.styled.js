import styled from 'styled-components';
import { Drawer } from '@material-ui/core';

export const CustomDrawer = styled(Drawer)`
  /* width: 300px; */
  transition: all 225ms cubic-bezier(0, 0, 0.2, 1) 0ms!important;
  width: ${({ open }) => (open ? 300 : 0)}px;
  flex-shrink: 0;
  & > div{
    width: 300px;
  }
`;

export const DrawerHeader = styled.div`
  display: flex;
  align-items: center;
  padding: 7px 20px;
  justify-content: flex-end;
`;

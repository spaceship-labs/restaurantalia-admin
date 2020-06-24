import styled from 'styled-components';
import { AppBar, Toolbar } from '@material-ui/core';

export const AppBarCustom = styled(AppBar)`
  transition: all 225ms cubic-bezier(0, 0, 0.2, 1) 0ms!important;
  width: ${({ open }) => (open ? 'calcl( 100% - 300px )' : '100%')}!important;
  margin-left: ${({ open }) => (open ? '300px' : '0px')}!important;
  padding-left: ${({ open }) => (open ? '300px' : '0px')}!important;
`;

export const Header = styled(Toolbar)`
  background-color: #eb796e;
`;

export const TitleWrapper = styled.div`
  flex-grow: 1;
`;

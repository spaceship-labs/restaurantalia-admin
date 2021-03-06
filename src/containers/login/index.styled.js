import styled from 'styled-components';
import { Grid } from '@material-ui/core';
import loginBg from '../../theme/images/login.jpg';

export const GridContainer = styled(Grid)`
  height: 100vh;
`;

export const GridImage = styled(Grid)`
  /* background-image: url(https://source.unsplash.com/random); */
  background-image: url(${loginBg});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
`;

export const PaperDiv = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

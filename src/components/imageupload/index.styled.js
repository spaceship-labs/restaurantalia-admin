import styled from 'styled-components';
import { Fab, Card } from '@material-ui/core/';

export const UploadWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  flex-wrap: wrap;
  & > h3{
    width: 100%;
  }
`;

export const UploadItem = styled(Card)`
  flex-basis: ${({ multiple }) => (multiple ? '100%' : '45%')};
  min-width: ${({ multiple }) => (multiple ? '100%' : '45%')};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-bottom: 15px;
`;

export const UploadList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: flex-start;
`;

export const ImageItem = styled.div`
  background-color: #5d5d5d;
  padding: 10px;
  position: relative;
  flex-basis: ${({ multiple }) => (!multiple ? '100%' : '45%')};
  min-width: ${({ multiple }) => (!multiple ? '100%' : '45%')};
  display: flex;
  justify-content: center;
  padding: 25px 15px;
  box-sizing: border-box
`;

export const DeleteButton = styled(Fab)`
  position: absolute!important;
  margin: 0!important;
  padding: 8px!important;
  top: 10px;
  right: 10px;
`;

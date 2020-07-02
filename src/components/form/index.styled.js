import styled from 'styled-components';

export const Form = styled.form`
  display: block;
  padding: 20px;
  margin: 20px 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  box-sizing: border-box;
  width: 100%;
  & > .MuiFormControl-root{
    width: 45%;
    margin: 10px 0;
  }
`;

export const FormFooter = styled.div`
  width: 100%;
  margin-top: 25px;
`;

export const ImageFormWrapper = styled.div`
  width: 45%;
  margin: 10px 0;
`;

export const ImageList = styled.div`
  display: flex;
  flex-wrap: ${({ multiple }) => (multiple ? 'wrap' : 'nowrap')};
  justify-content: ${({ multiple }) => (multiple ? 'space-between' : 'center')};
`;

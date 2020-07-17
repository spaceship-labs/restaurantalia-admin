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

export const RowForm = styled.div`
  max-width: ${({ fullwidth }) => (fullwidth ? 100 : 45)}%;
  flex-basis: ${({ fullwidth }) => (fullwidth ? 100 : 45)}%;
`;

export const FormFooter = styled.div`
  width: 100%;
  margin-top: 25px;
`;

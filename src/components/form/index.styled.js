import styled from 'styled-components';

export const Form = styled.form`
  display: block;
  padding: 20px;
  margin: 20px 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  max-width: 1000px;
  box-sizing: border-box;
  width: 100%;
  & > .MuiFormControl-root{
    width: 45%;
    margin: 10px 0;
  }
`;

export const FormWrapper = styled.div``;

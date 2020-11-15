import styled from "@emotion/styled";

export const Formulario = styled.form`
  max-width: 600px;
  width: 95%;
  margin: 5rem auto 0 auto;

  fieldset {
    margin: 2rem 0;
    border: 1px solid #e1e1e1;
    padding: 2rem;
    font-size: 2rem;
  }
`;

export const FormGroup = styled.div`
  margin-bottom: 2rem;
  display: flex;
  align-items: center;

  label {
    flex: 0 0 150px;
    font-size: 1.8rem;
  }

  input,
  textarea {
    flex: 1;
    padding: 1rem;
  }

  textarea {
    height: 300px;
    resize: none;
  }
`;

export const InputSubmit = styled.button`
  background-color: var(--naranja);
  width: 100%;
  padding: 1.5rem;
  text-align: center;
  color: #fff;
  font-size: 1.8rem;
  text-transform: uppercase;
  border: none;
  font-weight: 700;

  &:hover {
    cursor: pointer;
    background-color: #ad3d1e;
    transition: background-color 0.2s;
  }
`;

export const FormTitle = styled.h1`
  text-align: center;
  margin-top: 2.5rem;
`;

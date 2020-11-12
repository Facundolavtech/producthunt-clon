import React from "react";
import styled from "@emotion/styled";

const Form = styled.form`
  position: relative;
`;

const InputText = styled.input`
  border: 1px solid var(--gris3);
  padding: 1rem;
  min-width: 300px;
  outline: none;
  border-bottom: 1px solid none;

  &:focus {
    border-bottom: 2px solid var(--naranja);
    transition: border-bottom 0.1s ease-in;
  }
`;

const InputSubmit = styled.button`
  height: 3rem;
  width: 3rem;
  display: block;
  background-size: 4rem;
  background-image: url("/static/img/buscar.png");
  background-repeat: no-repeat;
  position: absolute;
  right: 1rem;
  top: 1px;
  background-color: #fff;
  border: none;
  outline: none;
  cursor: pointer;
  text-indent: -9999px;
`;

const Buscar = () => {
  return (
    <Form>
      <InputText type="text" placeholder="Buscar productos..."></InputText>
      <InputSubmit type="submit">Buscar</InputSubmit>
    </Form>
  );
};

export default Buscar;

import React, { useState } from "react";
import styled from "@emotion/styled";
import Router from "next/router";

const Form = styled.form`
  position: relative;
`;

const InputText = styled.input`
  border: 2px solid var(--gris3);
  padding: 1rem;
  min-width: 300px;
  outline: none;

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
  top: 2px;
  background-color: #fff;
  border: none;
  outline: none;
  cursor: pointer;
  text-indent: -9999px;
`;

const Buscar = () => {
  const [busqueda, setBusqueda] = useState("");

  const buscarProducto = (e) => {
    e.preventDefault();
    console.log("buscando", busqueda);

    if (busqueda.trim() === "") return;

    //Redireccionar a buscar
    Router.push({
      pathname: "/buscar",
      query: {
        q: busqueda,
      },
    });
  };

  return (
    <Form onSubmit={buscarProducto}>
      <InputText
        onChange={(e) => setBusqueda(e.target.value)}
        type="text"
        placeholder="Buscar productos..."
      ></InputText>
      <InputSubmit type="submit"></InputSubmit>
    </Form>
  );
};

export default Buscar;

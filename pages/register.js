import React, { useState } from "react";
import styled from "@emotion/styled";
import Router from "next/router";
import Layout from "../components/layout/Layout";
import {
  Formulario,
  FormTitle,
  FormGroup,
  InputSubmit,
} from "../components/ui/Formulario";

//Firebase
import firebase from "../firebase"; //index.js

//Validaciones
import useValidacion from "../hooks/useValidacion";

import validarCrearCuenta from "../validacion/validarCrearCuenta";

const STATE_INICIAL = {
  nombre: "",
  email: "",
  password: "",
};

const Register = () => {
  const [error, setError] = useState(null);

  const {
    valores,
    errores,
    submitForm,
    handleSubmit,
    handleChange,
  } = useValidacion(STATE_INICIAL, validarCrearCuenta, crearCuenta);

  const { nombre, email, password } = valores;

  async function crearCuenta() {
    try {
      await firebase.registrar(nombre, email, password);
      setError(null);
      Router.push("/");
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <div>
      <Layout>
        <>
          <FormTitle>Crear Cuenta</FormTitle>
          <Formulario onSubmit={handleSubmit} noValidate>
            {errores.nombre && <p className="inputError">{errores.nombre}</p>}
            <FormGroup>
              <label htmlFor="nombre">Nombre</label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                placeholder="Ingresa tu nombre"
                value={nombre}
                onChange={handleChange}
              />
            </FormGroup>

            {errores.email && <p className="inputError">{errores.email}</p>}
            <FormGroup>
              <label htmlFor="nombre">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Ingresa tu email"
                value={email}
                onChange={handleChange}
              />
            </FormGroup>

            {errores.password && (
              <p className="inputError">{errores.password}</p>
            )}
            <FormGroup>
              <label htmlFor="nombre">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Ingresa tu password"
                value={password}
                onChange={handleChange}
              />
            </FormGroup>

            <InputSubmit type="submit">Registrarse</InputSubmit>
            {error ? <p className="inputError">{error}</p> : null}
          </Formulario>
        </>
      </Layout>
    </div>
  );
};

export default Register;

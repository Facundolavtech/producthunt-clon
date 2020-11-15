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
import validarIniciarSesion from "../validacion/validarIniciarSesion";

//Firebase
import firebase from "../firebase"; //index.js

//Validaciones
import useValidacion from "../hooks/useValidacion";

const STATE_INICIAL = {
  email: "",
  password: "",
};

const Login = () => {
  const [error, setError] = useState(null);

  const {
    valores,
    errores,
    submitForm,
    handleSubmit,
    handleChange,
  } = useValidacion(STATE_INICIAL, validarIniciarSesion, iniciarSesion);

  const { email, password } = valores;

  async function iniciarSesion() {
    try {
      await firebase.login(email, password);
      Router.push("/");
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <div>
      <Layout>
        <>
          <FormTitle>Iniciar Sesion</FormTitle>
          <Formulario onSubmit={handleSubmit} noValidate>
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

            <InputSubmit type="submit">Login</InputSubmit>
            {error ? <p className="inputError">{error}</p> : null}
          </Formulario>
        </>
      </Layout>
    </div>
  );
};

export default Login;

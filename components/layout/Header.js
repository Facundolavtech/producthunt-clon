import React, { useContext } from "react";
import Buscar from "../ui/Buscar";
import Nav from "./Nav";
import Link from "next/link";
import styled from "@emotion/styled";
import Boton from "../ui/Boton";
import { FirebaseContext } from "../../firebase";
import Router from "next/router";

const StyledHeader = styled.header`
  border-bottom: 1px solid var(--gris3);
  padding: 1rem 0;
`;

const ContenedorHeader = styled.div`
  max-width: 1200px;
  width: 95%;
  margin: 0 auto;

  @media (min-width: 768px) {
    display: flex;
    justify-content: space-between;
  }
`;

const Logo = styled.p`
  color: var(--naranja);
  font-size: 4rem;
  line-height: 0;
  font-weight: 700;
  margin-right: 2rem;
  font-family: "Roboto Slab", serif;
  cursor: pointer;
`;

const LoginColumn = styled.div`
  display: flex;
  align-items: center;
`;

const WelcomeMessage = styled.p`
  color: var(--naranja);
  font-weight: bold;
  margin-right: 2rem;
  font-size: 1.1em;
`;

const NavContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Header = () => {
  const { usuario, firebase } = useContext(FirebaseContext);

  const logout = () => {
    firebase.logout();
    Router.push("/");
  };

  return (
    <StyledHeader>
      <ContenedorHeader>
        <NavContainer>
          <Link href="/">
            <Logo>P</Logo>
          </Link>

          <Buscar />

          <Nav />
        </NavContainer>

        <LoginColumn>
          {usuario ? (
            <>
              <WelcomeMessage>Hola: {usuario.displayName}</WelcomeMessage>
              <Boton bgColor="true" onClick={() => logout()}>
                Cerrar Sesion
              </Boton>
            </>
          ) : (
            <>
              <Link href="/login">
                <Boton bgColor="true">Login</Boton>
              </Link>
              <Link href="/register">
                <Boton className="margin-left-2">Crear Cuenta</Boton>
              </Link>
            </>
          )}
        </LoginColumn>
      </ContenedorHeader>
    </StyledHeader>
  );
};

export default Header;

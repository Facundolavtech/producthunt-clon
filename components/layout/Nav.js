import React, { useContext } from "react";
import Link from "next/link";
import styled from "@emotion/styled";
import { FirebaseContext } from "../../firebase";

const StyledNav = styled.nav`
  padding-left: 2rem;

  a {
    font-size: 1.8rem;
    margin-left: 2rem;
    color: var(--gris2);
    font-weight: bold;

    &:last-of-type {
      margin-right: 0;
    }
  }
`;

const Nav = () => {
  const { usuario } = useContext(FirebaseContext);

  return (
    <StyledNav>
      <Link href="/">Inicio</Link>
      <Link href="/populares">Populares</Link>
      {usuario ? <Link href="/nuevo-producto">Nuevo Producto</Link> : null}
    </StyledNav>
  );
};

export default Nav;

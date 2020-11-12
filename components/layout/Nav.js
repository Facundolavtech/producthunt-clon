import React from "react";
import Link from "next/link";
import styled from "@emotion/styled";

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
  return (
    <StyledNav>
      <Link href="/">Inicio</Link>
      <Link href="/populares">Populares</Link>
      <Link href="/nuevo-producto">Nuevo Producto</Link>
    </StyledNav>
  );
};

export default Nav;

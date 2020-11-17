import React from "react";
import styled from "@emotion/styled";

const Title = styled.h1`
  margin-top: 5rem;
  text-align: center;
`;

const Error404 = ({ msg }) => {
  return <Title>{msg}</Title>;
};

export default Error404;

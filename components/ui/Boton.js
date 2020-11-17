import styled from "@emotion/styled";

const Boton = styled.a`
  display: block;
  font-weight: 700;
  text-transform: uppercase;
  border: 1px solid #d1d1d1;
  padding: 0.8rem 2rem;
  margin: 2rem auto;
  background-color: ${(props) => (props.bgColor ? "#DA552f" : "#fff")};
  color: ${(props) => (props.bgColor ? "#fff" : "#000")};
  cursor: pointer;
  text-align: center;

  &:last-of-type {
    margin-right: 0;
  }
`;

export default Boton;

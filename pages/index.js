import styled from "@emotion/styled";
import Layout from "../components/layout/Layout";

export default function Home() {
  const Heading = styled.h1`
    color: red;
  `;

  return (
    <div>
      <Layout>
        <Heading>Inicio</Heading>
      </Layout>
    </div>
  );
}

import React from "react";
import styled from "@emotion/styled";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { es } from "date-fns/locale";
import Link from "next/link";

const Producto = styled.li`
  padding: 4rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #e1e1e1;
`;

const Comentarios = styled.div`
  margin-top: 2rem;
  display: flex;
  align-items: center;

  div {
    display: flex;
    align-items: center;
    border: 1px solid #e1e1e1;
    padding: 0.3rem 1rem;
    margin-right: 2rem;
  }

  img {
    width: 2rem;
    margin-right: 2rem;
  }

  p {
    font-size: 1.6rem;
    margin-right: 1rem;
    font-weight: 700;
    &:last-of-type {
      margin: 0;
    }
  }
`;

const Votos = styled.div`
  flex: 0 0 auto;
  text-align: center;
  border: 1px solid #e1e1e1;
  padding: 1rem 3rem;

  div {
    font-size: 2rem;
  }

  p {
    margin: 0;
    font-size: 2rem;
    font-weight: 700;
  }
`;

const BtnDetalles = styled.a`
  min-width: 140px;
  width: 140px;
  height: 35px;
  background-color: var(--naranja);
  font-weight: bold;
  font-size: 1.4rem;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  /* border-radius: 5px; */

  &:hover {
    cursor: pointer;
    background-color: #ec5227;
    transition: background-color 0.2s;
  }
`;

const Titulo = styled.h2`
  font-size: 2rem;
  font-weight: bold;
  margin: 0;
`;

const Descripcion = styled.p`
  font-size: 1.5rem;
  margin: 0;
  color: #888;
`;

const DescripcionProducto = styled.div`
  flex: 0 1 600px;
  display: grid;
  grid-template-columns: 1fr 3fr;
  column-gap: 2rem;
`;

const DetallesProducto = ({ producto }) => {
  const {
    id,
    comentarios,
    nombre,
    creado,
    descripcion,
    empresa,
    url,
    urlimagen,
    votos,
  } = producto;

  return (
    <Producto>
      <DescripcionProducto>
        <div>
          <img className="product__details__img" src={urlimagen}></img>
        </div>
        <div>
          <Titulo>{nombre}</Titulo>
          <Descripcion>{descripcion}</Descripcion>

          <Comentarios>
            <div>
              <img src="/static/img/comentario.png"></img>
              <p>{comentarios.length} Comentarios</p>
            </div>
          </Comentarios>

          <p>
            Publicado hace:{" "}
            {formatDistanceToNow(new Date(creado), { locale: es })}
          </p>

          <Link href="/productos/[id]" as={`/productos/${id}`}>
            <BtnDetalles>Ver Detalles</BtnDetalles>
          </Link>
        </div>
      </DescripcionProducto>

      <Votos>
        <div>&#9650;</div>
        <p>{votos}</p>
      </Votos>
    </Producto>
  );
};

export default DetallesProducto;

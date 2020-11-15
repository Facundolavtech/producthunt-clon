import React from "react";

const DetallesProducto = ({ producto }) => {
  const {
    id,
    comentarios,
    nombre,
    creado,
    descripcion,
    empresa,
    url,
    urlImagen,
    votos,
  } = producto;

  return (
    <li>
      <div>
        <div>
          <img src={urlImagen}></img>
        </div>
        <div>
          <h1>{nombre}</h1>
        </div>
      </div>

      <div></div>
    </li>
  );
};

export default DetallesProducto;

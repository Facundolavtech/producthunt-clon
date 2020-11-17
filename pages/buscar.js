import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import Layout from "../components/layout/Layout";
import { useRouter } from "next/router";
import DetallesProducto from "../components/layout/DetallesProducto";
import useProductos from "../hooks/useProductos";

export default function Buscar() {
  const router = useRouter();
  const {
    query: { q },
  } = router;

  const { productos } = useProductos("creado");
  const [resultado, setResultado] = useState([]);

  useEffect(() => {
    const busqueda = q.toLowerCase();

    const filtro = productos.filter((producto) => {
      return (
        producto.nombre.toLowerCase().includes(busqueda) ||
        producto.descripcion.toLowerCase().includes(busqueda)
      );
    });

    setResultado(filtro);
  }, [q, productos]);
  return (
    <div>
      <Layout>
        {resultado.length > 0 ? (
          <div className="listado-productos">
            <div className="contenedor">
              <div className="bg-white">
                {resultado.map((producto) => (
                  <DetallesProducto key={producto.id} producto={producto} />
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="listado-productos">
            <div className="contenedor">
              <h2>No hay productos que coincidan con tu busqueda</h2>
            </div>
          </div>
        )}
      </Layout>
    </div>
  );
}

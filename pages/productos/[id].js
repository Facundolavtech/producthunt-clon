import React, { useEffect, useContext, useState } from "react";
import { useRouter } from "next/router";
import { FirebaseContext } from "../../firebase";
import Error404 from "../../components/layout/404";
import Layout from "../../components/layout/Layout";
import styled from "@emotion/styled";
import {
  FormGroup,
  Formulario,
  InputSubmit,
} from "../../components/ui/Formulario";
import Boton from "../../components/ui/Boton";
import formatDistanteToNow from "date-fns/formatDistanceToNow";
import { es } from "date-fns/locale";
import { formatRelativeWithOptions } from "date-fns/fp";

const NombreProducto = styled.h1`
  text-align: center;
  margin-top: 5rem;
`;

const ContenedorProducto = styled.div`
  @media (min-width: 768px) {
    display: grid;
    grid-template-columns: 2fr 1fr;
    column-gap: 2rem;
  }
`;

const CreadorProducto = styled.p`
  padding: 0.5rem 2rem;
  background-color: #da552f;
  color: #fff;
  text-transform: uppercase;
  font-weight: 700;
  text-align: center;
  letter-spacing: 1px;
  display: inline-block;
  font-size: 0.8em;
`;

const Comentarios = styled.h2`
  margin: 2rem 0;

  li {
    border: 1px solid #e1e1e1;
    padding: 2rem;
    margin-bottom: 10px;
    width: 50%;
  }

  p {
    font-weight: lighter;
  }

  span {
    font-weight: bold;
  }
`;

const Producto = () => {
  //Routing para obtener ID
  const router = useRouter();

  const [producto, setProducto] = useState("");
  const [error, setError] = useState(false);
  const [comentario, setComentario] = useState({});
  const [consultarDB, setConsultarDB] = useState(true);
  const [voto, setVoto] = useState(false);

  const {
    query: { id },
  } = router;

  const { usuario, firebase } = useContext(FirebaseContext);

  useEffect(() => {
    if (id && consultarDB) {
      const obtenerProducto = async () => {
        const productoQuery = await firebase.firebase
          .firestore()
          .collection("productos")
          .doc(id);
        const producto = await productoQuery.get();
        if (producto.exists) {
          setProducto(producto.data());
          setConsultarDB(false);
        } else {
          setError(true);
          setConsultarDB(false);
        }
      };
      obtenerProducto();
    }
  }, [id, consultarDB]);

  let {
    nombre,
    comentarios,
    urlimagen,
    votos,
    creado,
    descripcion,
    empresa,
    url,
    creador,
    haVotado,
  } = producto;

  if (Object.keys(producto).length === 0 && !error)
    return (
      <>
        <div>Cargando...</div>
      </>
    );

  let nuevoTotal = votos;

  const votarProducto = (e) => {
    setVoto(true);
    if (!usuario) router.push("/login");

    //Verificar si el usuario ha votado
    if (haVotado.includes(usuario.uid)) return;

    nuevoTotal++;

    //Guardar el id del usuario que ha votado
    const nuevoHanVotado = [...haVotado, usuario.uid];

    //Insertar en DB
    firebase.firebase.firestore().collection("productos").doc(id).update({
      votos: nuevoTotal,
      haVotado: nuevoHanVotado,
    });

    //Actualizar state
    setProducto({
      ...producto,
      votos: nuevoTotal,
    });

    setConsultarDB(true);
  };

  //Funciones para agregar comentario
  const comentarioChange = (e) => {
    setComentario({
      ...comentario,
      [e.target.name]: e.target.value,
    });
  };

  //Identifica si el comentario es del creador del producto
  const esCreador = (id) => {
    if (creador.id === id) {
      return true;
    }
  };

  const agregarComentario = (e) => {
    e.preventDefault();

    if (!usuario) {
      router.push("/");
    }

    comentario.usuarioId = usuario.uid;
    comentario.usuarioNombre = usuario.displayName;

    //Tomar copia de comentarios y agregarlos al arregalo
    const nuevosComentarios = [...comentarios, comentario];

    //Actualizar DB
    firebase.firebase.firestore().collection("productos").doc(id).update({
      comentarios: nuevosComentarios,
    });

    //Actualizar el state
    setProducto({
      ...producto,
      comentarios: nuevosComentarios,
    });

    setConsultarDB(true);
  };

  //Funcion que comprueba si el creador del producto es el mismo que esta autenticado
  const puedeBorrar = () => {
    if (!usuario) return false;

    if (creador.id === usuario.uid) {
      return true;
    }
  };

  const eliminarProducto = async () => {
    if (!usuario) {
      return router.push("/");
    }

    if (creador.id !== usuario.uid) {
      return router.push("/");
    }
    try {
      await firebase.firebase
        .firestore()
        .collection("productos")
        .doc(id)
        .delete();
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      {error ? (
        <Error404 msg="Producto no encontrado" />
      ) : (
        <div className="contenedor">
          <NombreProducto>{nombre}</NombreProducto>

          <ContenedorProducto>
            <div>
              <p>
                Publicado hace:{" "}
                {formatDistanteToNow(new Date(creado), { locale: es })}
              </p>
              <p>
                Por: {creador.nombre} de {empresa}
              </p>
              {puedeBorrar() && (
                <button onClick={eliminarProducto} className="eliminarProducto">
                  Eliminar Producto &#215;
                </button>
              )}
              <img src={urlimagen} />

              <p>{descripcion}</p>

              {usuario ? (
                <>
                  <h2>Agrega tu comentario</h2>
                  <form onSubmit={agregarComentario}>
                    <FormGroup>
                      <input
                        type="text"
                        name="mensaje"
                        placeholder="Ingresa tu mensaje"
                        onChange={comentarioChange}
                      />
                    </FormGroup>
                    <InputSubmit type="submit">Agregar comentario</InputSubmit>
                  </form>
                </>
              ) : null}

              <Comentarios>
                {comentarios.length === 0
                  ? "No hay comentarios"
                  : comentarios.map((comentario, i) => (
                      <li key={`${comentario.usuarioId} - ${i}`}>
                        <p>{comentario.mensaje}</p>
                        <p>
                          Escrito por: <span>{comentario.usuarioNombre}</span>
                        </p>
                        {esCreador(comentario.usuarioId) && (
                          <CreadorProducto>Es Creador</CreadorProducto>
                        )}
                      </li>
                    ))}
              </Comentarios>
            </div>

            <aside>
              <Boton target="_blank" bgColor="true" href={url}>
                Visitar URL
              </Boton>
              {usuario ? (
                <div className="margin-top-5">
                  <p className="align-center">{votos} Votos</p>
                  {haVotado.includes(usuario.uid) || voto ? (
                    <Boton>Producto votado</Boton>
                  ) : (
                    <Boton onClick={votarProducto} bgColor="true">
                      Votar
                    </Boton>
                  )}
                </div>
              ) : null}
            </aside>
          </ContenedorProducto>
        </div>
      )}
    </Layout>
  );
};

export default Producto;

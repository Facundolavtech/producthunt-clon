import React, { useState, useEffect } from "react";
import firebase from "firebase";

const useAuth = () => {
  const [usuarioAuthenticado, setUsuarioAuthenticado] = useState(null);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((usuario) => {
      if (usuario) {
        setUsuarioAuthenticado(usuario);
      } else {
        setUsuarioAuthenticado(null);
      }

      return () => unsubscribe();
    });
  }, []);

  return usuarioAuthenticado;
};

export default useAuth;

import * as app from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
import firebaseConfig from "./config";

class Firebase {
  constructor() {
    if (!app.default.apps.length) {
      app.default.initializeApp(firebaseConfig);
    }
    this.firebase = app.default;
    this.storage = app.default.storage();
  }

  // Registra un usuario
  async registrar(nombre, email, password) {
    const nuevoUsuario = await app.default
      .auth()
      .createUserWithEmailAndPassword(email, password);

    return await nuevoUsuario.user.updateProfile({
      displayName: nombre,
    });
  }

  // iniciar sesion
  async login(email, password) {
    return app.default.auth().signInWithEmailAndPassword(email, password);
  }

  async logout() {
    await app.default.auth().signOut();
  }
}

const firebase = new Firebase();

export default firebase;

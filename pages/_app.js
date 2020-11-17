import "../styles/globals.css";
import firebase, { FirebaseContext } from "../firebase";
import useAuth from "../hooks/useAuth";

function MyApp({ Component, pageProps }) {
  const usuario = useAuth();

  return (
    <FirebaseContext.Provider value={{ firebase, usuario }}>
      <Component {...pageProps} />
    </FirebaseContext.Provider>
  );
}

export default MyApp;

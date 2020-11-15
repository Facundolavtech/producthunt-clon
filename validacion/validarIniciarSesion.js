export default function validarIniciarSesion(valores) {
  let errores = {};

  //validar email
  if (!valores.email) {
    errores.email = "El email es obligatorio";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(valores.email)) {
    errores.email = "Email no valido";
  }

  //validar password
  if (!valores.password) {
    errores.password = "El password es obligatorio";
  }

  return errores;
}

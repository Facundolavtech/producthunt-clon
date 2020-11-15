export default function validarCrearCuenta(valores) {
  let errores = {};

  //validar nombre
  if (!valores.nombre) {
    errores.nombre = "El nombre es obligatorio";
  }

  //validar email
  if (!valores.empresa) {
    errores.empresa = "Ingrese la empresa";
  }

  //validar URL
  if (!valores.url) {
    errores.url = "Ingrese una URL";
  } else if (!/^(ftp|http|https):\/\/[^ "]+$/.test(valores.url)) {
    errores.url = "Ingrese una URL valida";
  }

  //validar descripcion
  if (!valores.descripcion) {
    errores.descripcion = "Agrega una descripcion de tu producto";
  }

  return errores;
}

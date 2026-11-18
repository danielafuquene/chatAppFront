import * as yup from "yup";

export function initialValues() {
  return {
    email: "",
    password: "",
  };
}

export function validationSchema() {
  return yup.object({
    email: yup.string().email("Correo valido").required(),
    password: yup.string().required().min(8, "Minimo 8 caracteres"),
  });
}

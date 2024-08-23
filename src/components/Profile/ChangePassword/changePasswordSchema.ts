import * as yup from "yup";

export const schema = yup.object().shape({
  current_password: yup.string().required("Este campo é brigatório"),
  new_password: yup.string().required("Este campo é obrigatório"),
  confirm_password: yup.string().required("Este campo é obrigatório"),
});
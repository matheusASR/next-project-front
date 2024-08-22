import * as yup from "yup";

export const schema = yup.object().shape({
  username: yup.string().required("O nome de usuário é obrigatório"),
  password: yup
    .string()
    .required("A senha é obrigatória")
    .min(6, "A senha deve ter pelo menos 6 caracteres"),
  firstName: yup.string().required("O primeiro nome é obrigatório"),
  lastName: yup.string().required("O sobrenome é obrigatório"),
  email: yup
    .string()
    .required("O e-mail é obrigatório")
    .email("E-mail inválido"),
  country: yup.string().required("O país é obrigatório"),
});

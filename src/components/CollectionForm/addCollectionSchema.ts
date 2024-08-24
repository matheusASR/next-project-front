import * as yup from "yup";

export const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  description: yup.string().required("Description is required"),
  coverImage: yup.string().required("A file is required"), 
});

import * as yup from "yup";

export const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  collection: yup.string().required("Collection name is required"),
  description: yup.string().required("Description is required"),
  coverImage: yup.mixed().required("A file is required"),
  content: yup.object().shape({
    title: yup.string().required("Title is required"),
  }),
});

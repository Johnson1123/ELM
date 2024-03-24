import * as Yup from "yup";
const passwordValidation = RegExp(
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/
);
export const registerSchemas = Yup.object().shape({
  email: Yup.string()
    .email("enter valid email")
    .min(3, "email must be more than 3")
    .required("Email is required"),
  name: Yup.string()
    .min(2, "name must be more that two character")
    .required("name is required"),
  password: Yup.string()
    .min(8, "Password must be between 8 to 15 character")
    .required()
    .matches(
      passwordValidation,
      "Password must include lower and upper case, 8 min"
    ),
  confirmPassword: Yup.string()
    .required("Please retype your password.")
    .oneOf([Yup.ref("password")], "Passwords must match"),
});
export const loginSchemas = Yup.object().shape({
  email: Yup.string()
    .email("enter valid email")
    .min(3, "email must be more than 3")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be between 8 to 15 character")
    .required()
    .matches(
      passwordValidation,
      "Password must include lower and upper case, 8 min"
    ),
});

export const addRoleSchemas = Yup.object().shape({
  email: Yup.string()
    .email("enter valid email")
    .min(3, "email must be more than 3")
    .required("Email is required"),
  role: Yup.string().required("role is required"),
});

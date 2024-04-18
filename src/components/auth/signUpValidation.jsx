import * as Yup from "yup";

export const signupValidation = Yup.object({
  //   name: Yup.string().min(3).required("Please enter a name"),
  email: Yup.string()
    .email("Please enter a valid email")
    .required("Please enter email"),
  password: Yup.string().min(5).required("Please enter password"),
  cpassword: Yup.string()
    .oneOf([Yup.ref("password")], "Password not matched")
    .required("Please confirm password"),
});

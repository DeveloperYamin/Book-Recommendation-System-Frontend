/* This TypeScript code snippet is defining two validation schemas using the Yup library. */

import * as Yup from "yup";

export const signUpschema = Yup.object({
  name: Yup.string().min(2).max(25).required("Please enter your name"),
  email: Yup.string().email().required("Please enter your Email"),
  password: Yup.string()
    .required("Please enter a password")
    .min(6, "At least 6 characters")
    .matches(/\d+/, { message: "At least 1 number" })
    .matches(/[a-z]+/, { message: "At least 1 lowercase" })
    .matches(/[A-Z]+/, { message: "At least 1 uppercase" })
    .matches(/[!@#$%^&*()-+]+/, {
      message: "At least 1 special character",
    })
    .test(
      "Password has spaces",
      { spaces: "No spaces allowed" },
      (value) => !/\s+/.test(value)
    )
    .strict(false),
});

export const logInschema = Yup.object({
  email: Yup.string().email().required("Please enter your Email"),
  password: Yup.string().required("Please enter Your password"),
});

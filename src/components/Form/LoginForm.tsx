/**
 * The `LoginForm` function is a React component that handles user login form submission using Formik
 * for form management and validation.
 * @returns The `LoginForm` component is being returned. It is a form component that includes two
 * `TextInput` components for email and password inputs, along with a `SubmitButton` component for
 * submitting the form. The form handles form validation using `useFormik` hook, and it also interacts
 * with the authentication context using the `useAuth` hook to handle the login functionality.
 */

import TextInput from "./TextInput";
import { useFormik } from "formik";
import { logInschema } from "@src/schemas";
import SubmitButton from "./SubmitButton";

import { useAuth } from "@src/hooks/useAuth";

const defaultUserDetails = {
  email: "",
  password: "",
};

function LoginForm() {
  const { login } = useAuth();
  const {
    values,
    handleSubmit,
    handleChange,
    handleBlur,
    errors,
    touched,
    isValid,
    isSubmitting,
    setSubmitting,
    resetForm,
  } = useFormik({
    initialValues: defaultUserDetails,
    validationSchema: logInschema,
    validateOnMount: true,
    onSubmit: async (values) => {
      await login(values);
      setSubmitting(false);
      resetForm();
    },
  });

  return (
    <form
      className="flex flex-col items-center w-full px-4 shrink space-y-7 sm:p-0"
      onSubmit={handleSubmit}
    >
      <TextInput
        type="email"
        placeholder="Your Email"
        id="email"
        name="email"
        label="Email"
        value={values.email ?? ""}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.email}
        touched={touched.email}
      />
      <TextInput
        type="password"
        placeholder="Password"
        id="password"
        name="password"
        label="Password"
        value={values.password ?? ""}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.password}
        touched={touched.password}
      />
      <div className="w-full sm:w-1/2">
        <SubmitButton
          disabled={!isValid}
          text="Sign In"
          isSubmitting={isSubmitting}
        />
      </div>
    </form>
  );
}

export default LoginForm;

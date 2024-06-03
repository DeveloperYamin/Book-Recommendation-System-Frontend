/**
 * The SignUpForm component is a form for user sign up with input fields for profile name, email, and
 * password, along with validation and submission functionality.
 * @returns The `SignUpForm` component is being returned. It is a form component that includes input
 * fields for profile name, email, and password, along with a submit button for signing up. The form is
 * using Formik for form handling and validation, and it is connected to an authentication context
 * using the `useAuth` hook. The form submission triggers a registration process using the `register`
 * function from the
 */


import TextInput from "./TextInput";
import { useFormik } from "formik";
import { signUpschema } from "../../schemas";
import SubmitButton from "./SubmitButton";
import { useAuth } from "@src/hooks/useAuth";

const defaultUserDetails = {
  name: "",
  email: "",
  password: "",
};

function SignUpForm() {
  const { register } = useAuth()
  const {
    values,
    touched,
    handleSubmit,
    handleChange,
    errors,
    handleBlur,
    isValid,
    isSubmitting,
    setSubmitting,
    resetForm,
  } = useFormik({
    initialValues: defaultUserDetails,
    validationSchema: signUpschema,
    validateOnMount: true,
    onSubmit: async (values) => {
      await register(values);
      setSubmitting(false);
      resetForm();
    },
  });

  return (
    <form
      className="flex flex-col items-center w-full px-4 shrink space-y-7 sm:p-0"
      onSubmit={handleSubmit}
      autoComplete="off"
      noValidate
    >
      <TextInput
        type="text"
        placeholder="Profile Name"
        id="name"
        name="name"
        label="Profile Name"
        value={values.name ?? ""}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.name}
        touched={touched.name}
      />

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
          text="Sign up"
          isSubmitting={isSubmitting}
        />
      </div>
    </form>
  );
}

export default SignUpForm;

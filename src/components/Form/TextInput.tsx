/* This code snippet is defining a React functional component called `TextInput`. Here's a breakdown of
what each part of the code is doing: */

import { InputHTMLAttributes } from "react";
import PasswordField from "./PasswordField";
import ValidationError from "./ValidationError";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  touched?: boolean;
}

function TextInput({ label, error, touched, type, id, ...rest }: Props) {
  return (
    <div className="flex flex-col flex-1 w-full space-y-2 sm:w-3/4">
      <label htmlFor={id} className="text-xl font-bold">
        {label}
      </label>
      {type === "password" ? (
        <PasswordField id={id} {...rest} />
      ) : (
        <input
          id={id}
          {...rest}
          className="w-full p-2 text-base font-semibold text-white border-none rounded-md outline-none appearance-none bg-input hover:outline-1 hover:outline-teal-50 shadow-slate-300/40 focus:border-5 focus:border-white"
        />
      )}
      <ValidationError error={error} touched={touched} />
    </div>
  );
}

export default TextInput;

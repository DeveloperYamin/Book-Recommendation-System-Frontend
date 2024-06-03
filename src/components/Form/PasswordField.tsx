/**
 * The PasswordField component in TypeScript React toggles between showing and hiding the password
 * input with visibility icons.
 * @param {Props}  - The code you provided is a React component called `PasswordField` that renders an
 * input field for entering passwords with a toggle button to show or hide the password.
 * @returns The `PasswordField` component is being returned. It is a custom input field component that
 * allows users to toggle the visibility of the entered password using the eye icons (`VisibilityIcon`
 * and `VisibilityOffIcon`). The component accepts props for an input field and renders an input
 * element with a toggle button for showing/hiding the password.
 */

import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { InputHTMLAttributes, useRef, useState } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  name?: string;
}

function PasswordField({ ...rest }: Props) {
  const ref = useRef<HTMLInputElement>(null);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const togglePassword = () => setShowPassword((show) => !show);

  return (
    <div className="relative">
      <input
        {...rest}
        ref={ref}
        type={showPassword ? "text" : "password"}
        className="w-full text-white text-base font-semibold p-2 rounded-md outline-none border-none appearance-none  bg-input hover:outline-1 hover:outline-teal-50 shadow-slate-300/40 focus:border-5 focus:border-white"
      />
      <div className="h-full w-fit flex items-center absolute top-0 bottom-0 right-0  pe-5">
        <button
          onClick={togglePassword}
          type="button"
          className="bg-transparent text-white
                  border-none hover:scale-110"
        >
          {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
        </button>
      </div>
    </div>
  );
}

export default PasswordField;

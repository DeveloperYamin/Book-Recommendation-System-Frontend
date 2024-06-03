/* The code snippet provided is a TypeScript React component for a sign-in page. Here's a breakdown of
what the code is doing: */

import { Link } from "@mui/material";
import { NavLink as RouterNavLink } from "react-router-dom";
import LoginForm from "@components/Form/LoginForm";

function SignIn() {
  return (
    <section className="flex justify-center w-full h-full p-8">
      <div className="w-full max-w-3xl p-2 text-white bg-light-blue rounded-xl sm:p-20">
        <h1 className="my-10 text-2xl font-bold text-center sm:text-5xl sm:mt-0">
          Sign In
        </h1>
        <hr className="w-full my-16 border-t-2 border-t-orange-200" />

        <LoginForm />

        <hr className="w-full my-10 border-t-2 border-t-orange-200" />
        <div className="w-full my-10 text-sm text-center">
          <span>Don't have an account? </span>
          <Link
            to="/auth/sign-up"
            component={RouterNavLink}
            className="text-white hover:text-ctc"
          >
            <span>Sign Up</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default SignIn;

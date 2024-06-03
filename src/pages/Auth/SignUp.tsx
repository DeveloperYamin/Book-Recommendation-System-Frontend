/* This code snippet is a React component named `SignUp` that represents a sign-up page. Here's a
breakdown of what the code is doing: */

import { NavLink as RouterNavLink } from "react-router-dom";

import { Link } from "@mui/material";
import SignupForm from "@components/Form/SignUpForm";

function SignUp() {
  return (
    <section className="flex justify-center w-full p-8 ">
      <div className="w-full max-w-3xl p-2 text-white bg-light-blue rounded-xl sm:p-20 ">
        <h1 className="my-10 text-2xl font-bold text-center sm:text-5xl sm:mt-0">
          Sign Up
        </h1>
        <hr className="w-full my-16 border-t-2 border-t-orange-200" />
        <SignupForm />
        <div className="w-full my-10 text-sm text-center">
          <span>Already have an account? </span>
          <Link to="/auth/sign-in" component={RouterNavLink}>
            <span className="text-white hover:text-ctc">Sign In</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default SignUp;

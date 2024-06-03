/* This code snippet is a React component called `UserSection` that handles the rendering of different
sections based on the user's authentication status. */

import { Link } from "@mui/material";
import { useAuth } from "@src/hooks/useAuth";
import { NavLink as RouterNavLink } from "react-router-dom";
function UserSection() {
  const { userInfo, logout } = useAuth();

  return userInfo ? (
    <>
      <li className="grow-0 basis-auto shrink-0">
        <span className="text-lg capitalize cursor-default">
          Hii, {userInfo.user.name}
        </span>
      </li>
      <li className="grow-0 basis-auto shrink-0">
        <Link
          to={`/account/${userInfo.user.id}`}
          className="text-white"
          component={RouterNavLink}
        >
          <span className="capitalize text-lg drop-shadow-[0_0_5px_rgba(255,255,255,0.25)] hover:drop-shadow-[0_0_5px_rgba(255,255,255,0.5)]">
            Account
          </span>
        </Link>
      </li>
      <li className="grow-0 basis-auto shrink-0">
        <button
          className="text-white bg-transparent border-none cursor-pointer"
          onClick={async () => {
            await logout();
          }}
        >
          <span className="font-bold drop-shadow-[0_0_5px_rgba(255,255,255,0.25)] hover:drop-shadow-[0_0_5px_rgba(255,255,255,0.5)] text-lg">
            Sign Out
          </span>
        </button>
      </li>
    </>
  ) : (
    <>
      <li className="grow-0 basis-auto shrink-0">
        <Link
          to={"/account/123456"}
          className="text-white"
          component={RouterNavLink}
        >
          <span className="capitalize text-lg drop-shadow-[0_0_5px_rgba(255,255,255,0.25)] hover:drop-shadow-[0_0_5px_rgba(255,255,255,0.5)]">
            Account
          </span>
        </Link>
      </li>
      <li className="grow-0 basis-auto shrink-0">
        <Link
          to="/auth/sign-in"
          className="text-white"
          component={RouterNavLink}
        >
          <span className="text-lg drop-shadow-[0_0_5px_rgba(255,255,255,0.25)] hover:drop-shadow-[0_0_5px_rgba(255,255,255,0.5)] ">
            Sign In
          </span>
        </Link>
      </li>
      <li className="grow-0 basis-auto shrink-0">
        <Link
          to="/auth/sign-up"
          className="text-white"
          component={RouterNavLink}
        >
          <span className="text-lg shadow-lg drop-shadow-[0_0_5px_rgba(255,255,255,0.25)] hover:drop-shadow-[0_0_5px_rgba(255,255,255,0.5)]">
            Sign Up
          </span>
        </Link>
      </li>
    </>
  );
}

export default UserSection;

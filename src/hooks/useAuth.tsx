/**
 * The `useAuth` function is a custom hook in TypeScript React that allows components to access the
 * authentication context using the `useContext` hook.
 */

import { AuthContext } from "@context/AuthContext";
import { useContext } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);

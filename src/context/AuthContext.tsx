/**
 * This TypeScript React code defines an AuthContext and AuthProvider for managing user authentication
 * and search functionality in a web application.
 * @property {User | null} user - The `user` property in the `AuthContextValue` represents the
 * currently authenticated user. It is of type `User | null`, where `User` is a type defined in your
 * application. This property holds the information of the user who is currently logged in. If no user
 * is logged in,
 * @property {Tokens | null} tokens - The `tokens` property in the code snippet refers to an object
 * that contains authentication tokens for the user. These tokens are typically used for authentication
 * and authorization purposes when making requests to protected endpoints on the server. The `tokens`
 * object likely includes properties such as an access token, a refresh token, and
 * @property login - The `login` function is responsible for handling the login functionality in the
 * application. It takes user credentials (email and password), sends a POST request to the server to
 * authenticate the user, and upon successful login, it updates the user state with the received user
 * data and tokens. It also stores the user
 * @property register - The `register` function in the code snippet is responsible for registering a
 * new user by sending a POST request to the `/auth/register` endpoint with the user data (name, email,
 * password). Upon a successful registration, it updates the user state with the received user data and
 * sets the tokens in the
 * @property logout - The `logout` function in the provided code is responsible for logging out the
 * user from the application. It sends a POST request to the server with the refresh token to
 * invalidate the user's session. After a successful logout, it removes the user and tokens data from
 * the local storage, displays a success message
 * @property searchHandler - The `searchHandler` function in the provided code is responsible for
 * fetching books based on the specified type of search. It takes a parameter `type` which can be one
 * of three values: "directed", "random", or "recommend".
 * @property setSearchTerm - The `setSearchTerm` property is a function that allows you to update the
 * search term state in the context. It is used to set a new value for the search term, which triggers
 * a re-render of components that depend on the search term within the context.
 * @property {string} debouncedSearchTerm - The `debouncedSearchTerm` property is a string that is used
 * for debouncing search input in the application. It is created using the `useDebounce` custom hook,
 * which delays updating the search term until a specified time has passed without further input. This
 * helps in reducing unnecessary API calls or
 * @property {string} searchTerm - The `searchTerm` property is a string state variable that holds the
 * current search term input by the user for searching books. It is used in the search functionality of
 * the application to fetch books based on the search term provided by the user.
 */
/* eslint-disable @typescript-eslint/no-non-null-assertion */

import { ReactNode, createContext, useEffect, useState } from "react";
import axios, { isAxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { Auth, Book, Tokens, User } from "@src/types";
import toast from "react-hot-toast";
import axiosInstance from "@src/utils/axiosInstance";
import { useDebounce } from "@src/hooks/useDebounce";

type AuthContextValue = {
  user: User | null;
  tokens: Tokens | null;
  login: (data: { email: string; password: string }) => Promise<void>;
  register: (data: {
    name: string;
    email: string;
    password: string;
  }) => Promise<void>;
  logout: () => Promise<void>;
  searchHandler: (type: "directed" | "random" | "recommend") => Promise<Book[]>;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  debouncedSearchTerm: string;
  searchTerm: string;
};

export const AuthContext = createContext<AuthContextValue>({
  login: () => Promise.resolve(),
  register: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  searchHandler: () => Promise.resolve([]),
  user: null,
  tokens: null,
  setSearchTerm: () => "",
  debouncedSearchTerm: "",
  searchTerm: "",
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User>(
    JSON.parse(localStorage.getItem("user")!) ?? null
  );
  const [tokens, setTokens] = useState<Tokens>(
    JSON.parse(localStorage.getItem("tokens")!) ?? null
  );
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")!) ?? null);
    setTokens(JSON.parse(localStorage.getItem("tokens")!) ?? null);
  }, []);

  const login = async (userData: { email: string; password: string }) => {
    try {
      const { data } = await axios.post<Auth>("/auth/login", userData);
      setUser(data.user);
      setTokens(data.tokens);
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("tokens", JSON.stringify(data.tokens));
      toast.success("Login successful");
      navigate("/");
    } catch (error) {
      toast.error(
        isAxiosError(error)
          ? error.response?.data.error.message
          : "Oops! Something unexpected happened"
      );
    }
  };

  const register = async (userData: {
    name: string;
    email: string;
    password: string;
  }) => {
    try {
      const { data } = await axios.post<Auth>("/auth/register", userData);
      setUser(data.user);
      setTokens(data.tokens);
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("tokens", JSON.stringify(data.tokens));
      toast.success("Register successful");
      navigate("/");
    } catch (error) {
      toast.error(
        isAxiosError(error)
          ? error.response?.data.error.message
          : "Oops! Something unexpected happened"
      );
    }
  };

  const logout = async () => {
    try {
      await axiosInstance.post("/auth/logout", {
        refreshToken: tokens.refresh.token,
      });
      localStorage.removeItem("user");
      localStorage.removeItem("tokens");
      toast.success("Logout successful");
      navigate("/auth/sign-in");
    } catch (error) {
      toast.error(
        isAxiosError(error)
          ? error.message
          : "Oops! Something unexpected happened"
      );
    }
  };

  const searchHandler = async (
    type: "directed" | "random" | "recommend" = "random"
  ): Promise<Book[]> => {
    let books: Book[] = [];
    if (type === "directed") {
      const { data } = await axiosInstance.get<Book[]>(
        `/books?search_query=${searchTerm}`
      );
      books = data;
    } else if (type === "recommend") {
      const { data } = await axiosInstance.get<Book[]>(
        `/books/recommendations`
      );
      books = data;
    } else {
      const { data } = await axios.get<Book[]>(`/books/randoms`);
      books = data;
    }
    return books;
  };

  const value: AuthContextValue = {
    login,
    register,
    logout,
    searchHandler,
    user,
    tokens,
    setSearchTerm,
    debouncedSearchTerm,
    searchTerm,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

/**
 * The above code defines an AuthContext for managing user authentication and book search functionality
 * in a TypeScript React application.
 * @property {User | null} user - The `user` property in the `AuthContextValue` represents the
 * currently authenticated user. It is of type `User | null`, where `User` is a type defined in your
 * application. This property holds the information of the user who is currently logged in, or it is
 * `null` if
 * @property {Tokens | null} tokens - The `tokens` property in the code snippet refers to an object
 * that contains authentication tokens for the user. These tokens are typically used for authentication
 * and authorization purposes when making requests to protected endpoints on the server. The `tokens`
 * object likely includes properties such as an access token, a refresh token, and
 * @property login - The `login` function in the `AuthContextValue` type is responsible for handling
 * user login functionality. It takes an object `data` containing `email` and `password` as parameters
 * and returns a `Promise<void>`.
 * @property register - The `register` function in the `AuthProvider` component is responsible for
 * handling user registration. When invoked, it sends a POST request to the `/auth/register` endpoint
 * with the user's registration data (name, email, password). Upon a successful registration, it
 * updates the `user` and `
 * @property logout - The `logout` function in the provided code is responsible for logging out the
 * user. It sends a POST request to the server to revoke the refresh token, removes user and token data
 * from local storage, displays a success message using toast, and then navigates the user to the
 * sign-in page.
 * @property {Book[]} searchResults - The `searchResults` property in the `AuthContextValue` type
 * represents an array of `Book` objects that are the results of a search query. This array will hold
 * the books that match the search query entered by the user.
 * @property {Book[]} randomSearchResults - `randomSearchResults` is a state variable that holds an
 * array of `Book` objects representing the search results when a search query is not provided. These
 * results are fetched from the server and stored in this state for display purposes.
 * @property {boolean} isSearching - The `isSearching` property in the code snippet is a boolean state
 * variable that is used to indicate whether a search operation is currently in progress or not. It is
 * initially set to `false` and is updated to `true` when a search operation is triggered, and then set
 * back to `false
 * @property searchHandler - The `searchHandler` function in the provided code is responsible for
 * handling book search functionality. It takes an optional `query` parameter which represents the
 * search query string. If a `query` is provided, it makes a GET request to fetch books that match the
 * search query from the server using the `
 * @property recommendationSearchHandler - The `recommendationSearchHandler` function is responsible
 * for fetching recommended books from the server. It sends a GET request to the
 * `/books/recommendations` endpoint using the `axiosInstance` and updates the state with the received
 * data. After fetching the recommended books, it sets the `recommendationSearch
 * @property {Book[]} recommendationSearchResults - `recommendationSearchResults` is an array of `Book`
 * objects that stores the search results for book recommendations. This array is populated when the
 * `recommendationSearchHandler` function is called, which fetches book recommendations from the server
 * and updates the state with the retrieved data.
 */

import { ReactNode, createContext, useState } from "react";
import axios, { isAxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { Auth, Book, Tokens, User } from "@src/types";
import toast from "react-hot-toast";
import axiosInstance from "@src/utils/axiosInstance";

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
  searchResults: Book[];
  randomSearchResults: Book[];
  isSearching: boolean;
  searchHandler: (type: "directed" | "random" | "recommend") => Promise<void>;
  recommendSearchResults: Book[];
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  searchTerm: string;
};

export const AuthContext = createContext<AuthContextValue>({
  login: () => Promise.resolve(),
  register: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  searchResults: [],
  isSearching: false,
  searchHandler: () => Promise.resolve(),
  randomSearchResults: [],
  recommendSearchResults: [],
  user: null,
  tokens: null,
  setSearchTerm: () => "",
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
  const [searchResults, setSearchResults] = useState<Book[]>([]);
  const [randomSearchResults, setRandomSearchResults] = useState<Book[]>([]);
  const [recommendSearchResults, setRecommendSearchResults] =
    useState<Book[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

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
  ) => {
    setIsSearching(true);
    if (searchTerm && type === "directed") {
      const { data } = await axiosInstance.get<Book[]>(
        `/books?search_query=${searchTerm}`
      );
      setSearchResults(data);
    }
    if (type === "random") {
      const { data } = await axios.get<Book[]>(`/books/randoms`);
      setRandomSearchResults(data);
    }
    if (user && type === "recommend") {
      const { data } = await axiosInstance.get<Book[]>(
        `/books/recommendations`
      );
      setRecommendSearchResults(data);
    }
    setIsSearching(false);
  };

  const value: AuthContextValue = {
    login,
    register,
    logout,
    searchResults,
    isSearching,
    searchHandler,
    randomSearchResults,
    recommendSearchResults,
    user,
    tokens,
    setSearchTerm,
    searchTerm,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

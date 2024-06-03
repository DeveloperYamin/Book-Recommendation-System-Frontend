/**
 * The above code defines an AuthProvider component in TypeScript React that manages user
 * authentication, search functionality, and API calls within a context.
 * @property {UserInfo | null} userInfo - The `userInfo` property in the `AuthContextValue` represents
 * the user information such as name, email, and tokens stored in the context. It is initially set to
 * `null` and gets updated when a user logs in or registers. The user information is stored in the
 * local storage to maintain the
 * @property login - The `login` function in the provided code is responsible for authenticating a user
 * by sending a POST request to the `/auth/login` endpoint with the user's email and password. Upon a
 * successful login, it sets the user information in the state and stores it in the local storage. If
 * there is
 * @property register - The `register` function in the `AuthProvider` component is responsible for
 * registering a new user by sending a POST request to the `/auth/register` endpoint with the user data
 * (name, email, password). Upon successful registration, it sets the user information in the state and
 * local storage, displays a success
 * @property logout - The `logout` function in the provided code is responsible for logging out the
 * user. It sends a POST request to the `/auth/logout` endpoint with the user's refresh token to
 * invalidate the session. Upon successful logout, it removes the user information from local storage,
 * displays a success message using `toast
 * @property {any[]} searchResults - The `searchResults` property in the `AuthContextValue` type
 * represents an array that will hold the search results obtained from searching for books based on a
 * query. This array will be populated with the search results fetched from the backend API when the
 * `searchHandler` function is called with a specific query
 * @property {any[]} randomSearchResults - The `randomSearchResults` property in the code snippet is a
 * state variable that holds an array of search results for books fetched from the API when no specific
 * search query is provided. It is used in the `searchHandler` function to store and update the search
 * results when a random search is performed.
 * @property {boolean} isSearching - The `isSearching` property is a boolean state variable that
 * indicates whether a search operation is currently in progress. It is used to control loading
 * indicators or other UI elements to provide feedback to the user that a search is ongoing. When
 * `isSearching` is `true`, it typically means that the application
 * @property searchHandler - The `searchHandler` function in the provided code is responsible for
 * handling search functionality. It takes an optional `query` parameter, which is used to search for
 * books based on the query string. If a `query` is provided, it makes a GET request to
 * `/books?search_query=${query
 * @property recommendationSearchHandler - The `recommendationSearchHandler` function is responsible
 * for fetching recommended books from the server. It sets the `isSearching` state to true to indicate
 * that a search operation is in progress. Then it makes a GET request to the `/books/recommendations`
 * endpoint using the `axiosInstance` to
 * @property {any[]} recommendationSearchResults - The `recommendationSearchResults` property in the
 * `AuthContextValue` type represents an array that holds the search results for book recommendations.
 * This array will contain the data fetched from the API endpoint `/books/recommendations` when the
 * `recommendationSearchHandler` function is called. The data in
 */


import { ReactNode, createContext, useEffect, useState } from "react";
import axios, { isAxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { UserInfo } from "@src/types";
import toast from "react-hot-toast";
import axiosInstance from "@src/utils/axiosInstance";

type AuthContextValue = {
  userInfo: UserInfo | null;
  login: (data: { email: string; password: string }) => Promise<void>;
  register: (data: {
    name: string;
    email: string;
    password: string;
  }) => Promise<void>;
  logout: () => Promise<void>;
  searchResults: any[];
  randomSearchResults: any[];
  isSearching: boolean;
  searchHandler: (query?: string) => Promise<void>;
  recommendationSearchHandler: () => Promise<void>;
  recommendationSearchResults: any[];
};

export const AuthContext = createContext<AuthContextValue>({
  userInfo: null,
  login: () => Promise.resolve(),
  register: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  searchResults: [],
  isSearching: false,
  searchHandler: () => Promise.resolve(),
  randomSearchResults: [],
  recommendationSearchResults: [],
  recommendationSearchHandler: () => Promise.resolve(),
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(
    JSON.parse(localStorage.getItem("userInfo") ?? "null")
  );
  const navigate = useNavigate();
  const [searchResults, setSearchResults] = useState([]);
  const [randomSearchResults, setRandomSearchResults] = useState([]);
  const [recommendationSearchResults, setRecommendationSearchResults] =
    useState([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    (async () => {
      const userInfoString = localStorage.getItem("userInfo");
      if (userInfoString) {
        const parsedUserInfo = JSON.parse(userInfoString) as UserInfo;
        console.log("🚀 ~ parsedUserInfo:", parsedUserInfo);
      }
    })();
  }, []);

  const login = async (userData: { email: string; password: string }) => {
    try {
      const { data } = await axios.post("/auth/login", userData);
      setUserInfo(data);
      localStorage.setItem("userInfo", JSON.stringify(data));
      toast.success("Login successful");
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
      const { data } = await axios.post("/auth/register", userData);
      setUserInfo(data);
      localStorage.setItem("userInfo", JSON.stringify(data));
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
        refreshToken: userInfo?.tokens.refresh.token,
      });
      localStorage.removeItem("userInfo");
      toast.success("Logout successful");
      navigate("/login");
    } catch (error) {
      toast.error(
        isAxiosError(error)
          ? error.message
          : "Oops! Something unexpected happened"
      );
    }
  };

  const searchHandler = async (query?: string) => {
    setIsSearching(true);
    if (query) {
      const { data } = await axiosInstance.get(`/books?search_query=${query}`);
      setSearchResults(data);
    } else {
      const { data } = await axiosInstance.get(`/books`);
      setRandomSearchResults(data);
    }
    setIsSearching(false);
  };

  const recommendationSearchHandler = async () => {
    setIsSearching(true);
    const { data } = await axiosInstance.get(`/books/recommendations`);
    setRecommendationSearchResults(data);
    setIsSearching(false);
  };

  const value: AuthContextValue = {
    userInfo,
    login,
    register,
    logout,
    searchResults,
    isSearching,
    searchHandler,
    randomSearchResults,
    recommendationSearchHandler,
    recommendationSearchResults,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

/**
 * These TypeScript types define data structures related to user authentication and authorization.
 * @property {string} email - The `email` property is a string that represents the email address of a
 * user. It is commonly used as a unique identifier for user accounts and for communication purposes.
 * @property {string} password - The `password` property is a string type within the `LoginData` type.
 * It is used to store the password information provided during the login process.
 */

export type LoginData = {
  email: string;
  password: string;
};

export type SignUpData = LoginData & {
  name: string;
};

export type User = {
  name: string;
  email: string;
  id: string;
};

export type AccessToken = {
  token: string;
  expires: string;
};

export type RefreshToken = {
  token: string;
  expires: string;
};

export type Tokens = {
  access: AccessToken;
  refresh: RefreshToken;
};

export type Auth = {
  user: User;
  tokens: Tokens;
};

export type Book = {
  title: string;
  thumbnail: string;
  authors: string[];
};

export type SearchHistory = {
  _id: string;
  query: string;
  userId: string;
  genres: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}
export type Profile = {
  user: User;
  searchHistory: SearchHistory[];
}
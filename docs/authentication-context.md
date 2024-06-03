# Authentication Context and Related Components

This project includes an authentication context and related components for handling user authentication, search functionality, and API calls in a React application with TypeScript.

## Components

### `AuthContext` and `AuthProvider`

The `AuthContext` and `AuthProvider` components are responsible for managing the user authentication state and functionality. The `AuthProvider` component wraps the application and provides the following properties and functions through the `AuthContext`:

- `userInfo`: Stores the user's information, including name, email, and tokens.
- `login`: Function for user login, sends a POST request to the `/auth/login` endpoint.
- `register`: Function for user registration, sends a POST request to the `/auth/register` endpoint.
- `logout`: Function for user logout, sends a POST request to the `/auth/logout` endpoint.
- `searchResults`: Array that holds the search results for books based on a specific query.
- `randomSearchResults`: Array that holds the search results for books when no specific query is provided.
- `isSearching`: Boolean indicating whether a search operation is in progress.
- `searchHandler`: Function for handling search queries, sends a GET request to `/books?search_query=${query}`.
- `recommendationSearchHandler`: Function for fetching recommended books, sends a GET request to `/books/recommendations`.
- `recommendationSearchResults`: Array that holds the search results for book recommendations.

### `LoginForm` and `SignUpForm`

The `LoginForm` and `SignUpForm` components are responsible for rendering the login and registration forms, respectively. They utilize the `useFormik` hook from Formik for form management and validation, and the `useAuth` hook to interact with the authentication context.

### `PasswordField`, `SubmitButton`, `TextInput`, and `ValidationError`

These components are used within the `LoginForm` and `SignUpForm` components for rendering form inputs, buttons, and validation errors.

- `PasswordField`: A custom input field component that allows users to toggle the visibility of the entered password.
- `SubmitButton`: A button component that conditionally renders either a CircularProgress component or the text passed as a prop based on the `isSubmitting` prop.
- `TextInput`: A custom input field component that handles different input types (text, email, password) and renders validation errors.
- `ValidationError`: A component that displays an error message with an icon if an error exists and the field has been touched.

### `useDebounce`

The `useDebounce` custom hook is used to debounce a value with a specified delay. It is used in the search functionality to prevent excessive API calls while typing in the search query.

## Functionality

### Authentication

The `AuthContext` and `AuthProvider` components handle user authentication, including login, registration, and logout. They interact with the backend API and manage the user's information and tokens in the local storage.

### Search

The search functionality is implemented through the `searchHandler` and `recommendationSearchHandler` functions. The `searchHandler` function sends a GET request to the `/books?search_query=${query}` endpoint to fetch search results based on the provided query. If no query is provided, it fetches random search results from the `/books` endpoint. The `recommendationSearchHandler` function fetches recommended books from the `/books/recommendations` endpoint.

### Form Validation

Form validation is handled using the Formik library and the `yup` library for defining validation schemas. The `signUpschema` and `logInschema` define the validation rules for the sign-up and login forms, respectively.

### API Integration

The application integrates with a backend API using Axios. Global request and response interceptors are set up for handling authentication token refresh. If a 401 Unauthorized error occurs, the interceptor attempts to refresh the access token by sending a POST request to the `/auth/refresh-tokens` endpoint with the refresh token. If the token refresh is successful, the original request is retried with the new access token. If the token refresh fails, the user is redirected to the login page.

## Types and Schemas

The project includes TypeScript types and schemas for user data, form validation, and authentication-related data structures, such as `LoginData`, `SignUpData`, `User`, `AccessToken`, `RefreshToken`, `Tokens`, and `UserInfo`.

## Environment Variables

Make sure to set the `VITE_API_BASE_URL` environment variable with the appropriate API base URL for the backend API.

## Backend API Endpoints

The application expects the following backend API endpoints to be available:

- `/auth/login`: POST request for user login, expects `email` and `password` in the request body.
- `/auth/register`: POST request for user registration, expects `name`, `email`, and `password` in the request body.
- `/auth/logout`: POST request for user logout, expects `refreshToken` in the request body.
- `/books?search_query=${query}`: GET request for searching books, expects a `search_query` query parameter.
- `/books`: GET request for fetching random books.
- `/books/recommendations`: GET request for fetching recommended books.
- `/auth/refresh-tokens`: POST request for refreshing access and refresh tokens, expects `refreshToken` in the request body.

Ensure that the backend API endpoints match the expected data structures and response formats.
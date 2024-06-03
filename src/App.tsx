/**
 * The App component in this TypeScript React application sets up routes for different pages, including
 * Home, SignIn, and SignUp, with and without a navbar layout.
 * @returns The App component is being returned, which contains the main structure of the application.
 * It includes routes for different pages such as Home, SignIn, and SignUp, with some pages having a
 * Layout component that includes a navbar.
 */

import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home/Home";
import Layout from "./Layout";
import SignIn from "./pages/Auth/SignIn";
import SignUp from "./pages/Auth/SignUp";

function App() {
  return (
      <main className="flex flex-col items-center min-h-screen bg-dark-blue">
        <Routes>
          // with navbar pages
          <Route element={<Layout />}>
            <Route path="/" element={<Home />}></Route>
          </Route>
          // without navbar pages
          <Route path="/auth/sign-in" element={<SignIn />} />
          <Route path="/auth/sign-up" element={<SignUp />} />
        </Routes>
      </main>
      
  );
}

export default App;

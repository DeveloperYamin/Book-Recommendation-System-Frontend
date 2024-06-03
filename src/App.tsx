
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home/Home";
import Layout from "./Layout";

function App() {
  return (
      <main className="flex flex-col items-center min-h-screen bg-dark-blue">
        <Routes>
          // with navbar pages
          <Route element={<Layout />}>
            <Route path="/" element={<Home />}></Route>
          </Route>
        </Routes>
      </main>
      
  );
}

export default App;

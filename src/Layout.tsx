/**
 * The Layout component renders a full-page layout with a dark blue background, content area, footer
 * with author information, and uses React Router's Outlet for nested routes.
 * @returns The `Layout` component is being returned. It consists of a `div` element with a dark blue
 * background containing a `flex` container with vertical direction and padding. Inside this container,
 * the `Outlet` component is rendered. Following the `Outlet`, there is an `hr` element with a black
 * border. Finally, there is a `footer` element with a dark blue background containing a paragraph
 */

import Navbar from "@components/Navbar/Navbar";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="w-full h-full bg-dark-blue">
      <div className="flex flex-col w-full h-full p-10 space-y-5 min-h-[90vh]">
        <Navbar/>
        <Outlet />
      </div>
      <hr className="border-black" />
      <footer className="flex items-center justify-center w-full p-5 bg-dark-blue">
        <p className="text-lg font-light text-white">Made by Yamin</p>
      </footer>
    </div>
  );
}

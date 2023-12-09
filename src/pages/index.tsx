import { createBrowserRouter } from "react-router-dom";
import { Layout } from "./Layout";
import { Home } from "./Home";
import { Cars } from "./Cars";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "cars", element: <Cars /> },
    ],
  },
]);

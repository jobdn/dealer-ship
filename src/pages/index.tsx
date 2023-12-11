import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { Layout } from "./Layout";
import { Home } from "./Home";
import { Cars } from "./Cars";
import { Auth } from "./Auth";
import { ProtectedRoute } from "../components/ProtectedRoute";
import { AuthLayout } from "./AuthLayout";
import { EditCar } from "./EditCar";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<AuthLayout />}>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />}></Route>
        <Route
          path="cars"
          element={
            <ProtectedRoute>
              <Cars />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="cars/:id"
          element={
            <ProtectedRoute>
              <EditCar />
            </ProtectedRoute>
          }
        ></Route>
      </Route>

      <Route path="/auth" element={<Auth />}></Route>
    </Route>
  )
);

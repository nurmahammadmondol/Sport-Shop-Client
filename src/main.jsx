import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthProvider from "./Components/Provider/AuthProvider";
import Home from "./Components/Home/Home";
import ShowAll from "./Components/DefualtRoot/ShowAll";
import Products from "./Components/Main/Products/Products";
import AddEquipment from "./Components/Main/AddEquipment/AddEquipment";
import MyEquipment from "./Components/Main/MyEquipment/MyEquipment";
import AboutUs from "./Components/Main/AboutUs/AboutUs";
import Details from "./Components/Main/Details/Details";
import Update from "./Components/Main/Update/Update";
import ContactUs from "./Components/Main/Contact/ContactUs";

import LogIn from "./Components/SignUpAndIN/Login/LogIn";
import SignUp from "./Components/SignUpAndIN/SignUp/SignUp";
import Privet from "./PrivetRoot/Privet";
import MyOrder from "./Components/Main/Myorder/MyOrder";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient()
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home></Home>,
    errorElement: <h3>Error 404</h3>,
    children: [
      {
        path: "/",
        element: <ShowAll></ShowAll>,
      },
      {
        path: "/Products",
        element: <Products></Products>,

      },
      {
        path: "/AddEquipment",
        element: (
          <Privet>
            <AddEquipment></AddEquipment>
          </Privet>
        ),
      },
      {
        path: "/MyEquipment",
        element: (
          <Privet>
            <MyEquipment></MyEquipment>
          </Privet>
        ),

      },
      {
        path: "/AboutUS",
        element: <AboutUs></AboutUs>,
      },
      {
        path: "/ContactUS",
        element: <ContactUs></ContactUs>,
      },
      {
        path: "/Details/:id",
        element: (
          <Privet>
            <Details></Details>
          </Privet>
        ),

      },
      {
        path: "/myorder",
        element: (
          <Privet>
            <MyOrder />
          </Privet>
        ),

      },
      {
        path: "/Update/:id",
        element: (
          <Privet>
            <Update></Update>
          </Privet>
        ),

      },
      {
        path: "/LogIn",
        element: <LogIn></LogIn>,
      },
      {
        path: "/Registration",
        element: <SignUp></SignUp>,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>

      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>

    </QueryClientProvider>


  </StrictMode>
);

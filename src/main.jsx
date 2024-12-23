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
        loader: () => fetch("http://localhost:1000/All_Accessories"),
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
        loader: () => fetch("http://localhost:1000/All_Accessories"),
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
        loader: ({ params }) =>
          fetch(`http://localhost:1000/All_Accessories/${params.id}`),
      },
      {
        path: "/myorder",
        element: (
          <Privet>
            <MyOrder />
          </Privet>
        ),
        loader: () => fetch("http://localhost:1000/All_Accessories"),
      },
      {
        path: "/Update/:id",
        element: (
          <Privet>
            <Update></Update>
          </Privet>
        ),
        loader: ({ params }) =>
          fetch(`http://localhost:1000/All_Accessories/${params.id}`),
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
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);

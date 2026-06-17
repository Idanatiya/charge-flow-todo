import { createBrowserRouter } from "react-router";

import RootLayout from "../../layouts/RootLayout";
import ErrorPage from "../../pages/ErrorPage";
import HomePage from "../../pages/HomePage";
import NotFoundPage from "../../pages/NotFoundPage";
import { routes } from "./routes";

export const router = createBrowserRouter([
  {
    path: routes.root.path,
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: routes.notFound.path, element: <NotFoundPage /> },
    ],
  },
]);

import { createBrowserRouter } from "react-router-dom";

import RootLayout from "../pages/layouts/RootLayout";
import HomePage from "../pages/Home";
import AuthPage from "../pages/Auth";
import JobDetailPage from "../pages/JobDetail";
import UserProfilePage from "../pages/UserProfile";

import RequireAuth from "../components/RequireAuth";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "/jobs/:id", element: <JobDetailPage /> },
      {
        element: <RequireAuth />,
        children: [
          {
            path: "/profile",
            element: <UserProfilePage />,
          },
        ],
      },
    ],
  },
  { path: "/auth/:mode", element: <AuthPage /> },
]);

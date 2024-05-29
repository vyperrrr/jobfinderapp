import { createBrowserRouter } from "react-router-dom";

import RootLayout from "../pages/layouts/RootLayout";
import HomePage from "../pages/Home";
import AuthPage from "../pages/Auth";
import JobDetailsPage from "../pages/JobDetails";
import UserProfilePage from "../pages/UserProfile";
import CreateAdvertisementPage from "../pages/CreateAdvertisement";

import RequireAuth from "../pages/RequireAuth";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "/jobs/:id", element: <JobDetailsPage /> },
      {
        element: <RequireAuth />,
        children: [
          {
            path: "/profile",
            element: <UserProfilePage />,
          },
          {
            path: "/advertisements/new",
            element: <CreateAdvertisementPage />,
          },
        ],
      },
    ],
  },
  { path: "/auth/:mode", element: <AuthPage /> },
]);

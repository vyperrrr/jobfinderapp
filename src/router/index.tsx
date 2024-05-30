import { createBrowserRouter } from "react-router-dom";

import RootLayout from "../pages/layouts/RootLayout";
import HomePage from "../pages/Home";
import AuthPage from "../pages/Auth";
import JobDetailsPage from "../pages/JobDetails";
import UserProfilePage from "../pages/UserProfile";
import CreateAdvertisementPage from "../pages/CreateAdvertisement";
import EditAdvertisementPage from "../pages/EditAdvertisement";

import RequireAuth from "../pages/RequireAuth";
import RequireCompany from "../pages/RequireCompany";

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
            element: <RequireCompany />,
            children: [
              {
                path: "/advertisements/new",
                element: <CreateAdvertisementPage />,
              },
              {
                path: "/advertisements/:id/edit",
                element: <EditAdvertisementPage />,
              },
            ],
          },
        ],
      },
    ],
  },
  { path: "/auth/:mode", element: <AuthPage /> },
]);

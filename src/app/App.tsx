import { RouterProvider } from "react-router-dom";

import { router } from "../router";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { login } from "../features/authSlice";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const authenticated = JSON.parse(
      localStorage.getItem("authenticated") || "{}",
    );
    dispatch(login({ user: authenticated.user, token: authenticated.token }));
  });

  return <RouterProvider router={router} />;
}

export default App;

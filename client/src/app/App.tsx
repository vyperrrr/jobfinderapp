import { RouterProvider } from "react-router-dom";

import { router } from "../router";

import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <ToastContainer position="top-center" />
      <RouterProvider router={router} />
    </>
  );
}

export default App;

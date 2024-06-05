import ReactDOM from "react-dom/client";
import App from "./app/App.tsx";
import "@radix-ui/themes/styles.css";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";

import { Theme } from "@radix-ui/themes";
import { store } from "./app/store.ts";
import { Provider } from "react-redux";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Theme
    accentColor="mint"
    grayColor="sand"
    appearance="dark"
    panelBackground="translucent"
    radius="small"
    scaling="100%"
  >
    <Provider store={store}>
      <App />
    </Provider>
  </Theme>,
);

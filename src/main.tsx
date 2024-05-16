import ReactDOM from "react-dom/client";
import App from "./app/App.tsx";
import "@radix-ui/themes/styles.css";
import "./index.css";

import { Theme } from "@radix-ui/themes";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Theme
    accentColor="gray"
    grayColor="sand"
    appearance="light"
    panelBackground="translucent"
    radius="small"
    scaling="100%"
  >
    <App />
  </Theme>,
);

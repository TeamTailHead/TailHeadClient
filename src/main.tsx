import React from "react";
import ReactDOM from "react-dom/client";
import { RecoilRoot } from "recoil";

import App from "./App";
import { Debug } from "./debug";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RecoilRoot>
      <App />
      <Debug />
    </RecoilRoot>
  </React.StrictMode>
);

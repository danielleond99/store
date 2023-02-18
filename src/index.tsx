import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./modules/app/App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import store from "./modules/app/store";
import { Toast } from "./modules/app/components/Toast";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Toast>
        <App />
      </Toast>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

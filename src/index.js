import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import store from "./app/store";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { I18nextProvider } from "react-i18next";
import i18n from "./translate";

axios.defaults.withCredentials = true;
ReactDOM.render(
	// <React.StrictMode>
	<Provider store={store}>
		<I18nextProvider i18n={i18n}>
			<App />
		</I18nextProvider>
	</Provider>,

	// </React.StrictMode>
	document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

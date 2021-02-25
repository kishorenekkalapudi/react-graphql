import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import AddDessert from "./newDessert";
import reportWebVitals from "./reportWebVitals";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";

const client = new ApolloClient({
  uri: "http://localhost:3000/graphql?",
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <div className="cf">
      <div className="fl w-50  tc">
        <App />
      </div>
      <div className="fl w-50  tc">
        <AddDessert />
      </div>
    </div>
  </ApolloProvider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

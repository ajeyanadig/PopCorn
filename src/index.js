import React from "react";
import ReactDOM from "react-dom/client";
// import StarRating from "./StarRating";
import "./index.css";
import App from "./App";
//key = 2b437c3f
// const messages = ["Terrible", "Meh", "Okay", "Pretty Good", "Must Watch !"];
// function justPrintTheVal(val) {
//   //access the internal state by passing in a handler, here imma just pass a function
//   console.log(val);
// }
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />

    {/* <StarRating
      // messages={messages}
      onSetRating={justPrintTheVal}
    /> */}
  </React.StrictMode>
);

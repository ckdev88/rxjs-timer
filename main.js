import "./style.css";
import { timer } from "./timer.js";

document.querySelector("#app").innerHTML = `
  <div>
    <div id="timer"></div>
  </div>
`;

timer();

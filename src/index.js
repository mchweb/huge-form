import React from "react";
import ReactDOM from "react-dom";

import ComponentsShowcase from "./Examples/ComponentsShowcase";
import SimpleFormExample from "./Examples/SimpleFormExample";
import GroupExample from "./Examples/GroupExample";
import StyledFormExample from "./Examples/StyledFormExample";
import GroupOne from "./Tasks/GroupOne";
import GroupTwo from "./Tasks/GroupTwo";
import GroupThree from "./Tasks/GroupThree";



import * as serviceWorker from "./serviceWorker";

ReactDOM.render(<GroupTwo />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

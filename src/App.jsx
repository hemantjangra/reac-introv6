// /*global React ReactDOM */
import React, { StrictMode, useState } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";

import { Pet } from "./Pet";
import { SearchParam } from "./SearchParam";
import Details from "./Details";
import { ThemeContext } from "./ThemeContext";

// const App = () => {
//   return React.createElement("div", { className: "first" }, [
//     React.createElement(Pet, {
//       key: "1",
//       name: "Luna???",
//       animal: "Dog",
//       breed: "Heaviness",
//     }),
//     React.createElement(Pet, {
//       key: "2",
//       name: "Pepper",
//       animal: "Bird",
//       breed: "Cockatiel",
//     }),
//     React.createElement(Pet, {
//       key: "3",
//       name: "Sudo",
//       animal: "Dog",
//       breed: "Wheaten Terrier",
//     }),
//   ]);
// };

// const App = () => {
//   return (
//     <div>
//       {/*<Pet name="Luna" animal="Dog" breed="Havens" />*/}
//       {/*<Pet name="Petter" animal="bird" breed="Cockatiel" />*/}
//       {/*<Pet name="Sudo" animal="Dog" breed="Wheaten Terrier" />*/}
//       <SearchParam />
//     </div>
//   );
// };

const App = () => {
  const theme = useState("darkBlue");
  return (
    <ThemeContext.Provider value={theme}>
      <Router>
        <header>
          <Link to="/">Adopt Me!</Link>
        </header>
        <Switch>
          <Route
            path="/details/:id"
            render={({ match }) => <Details id={match.params.id} />}
          />
          <Route path="/">
            <SearchParam />
          </Route>
        </Switch>
      </Router>
    </ThemeContext.Provider>
  );
};

ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById("app")
);

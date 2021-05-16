import "./App.css";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";

import Home from "./pages/Home";

function App() {
  return (
    <Router>
      <Switch>
        {/* "exact" is needed in this route, otherwise it would match all paths starting with "/" */}
        {/* Route paths go here */}
        <Route exact path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;

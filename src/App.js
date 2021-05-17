import "./App.css";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";

import Home from "./pages/Home";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;

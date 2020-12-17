import "../css/App.scss";
import Header from "./Header";
import { useState } from "react";
import Login from "./Login";
import Home from "./Home";
import Form from "./Form";
import { AxiosProvider } from "react-axios";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Switch>
          <Route exact path="/">
            <Redirect to="/login" />
          </Route>
          <Route exact path="/login" component={Login} />
          <Route exact path="/home" component={Home} />
          <Route exact path="/form" component={Form} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;

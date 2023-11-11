import logo from "./logo.svg";
import "./App.css";
import NavBar from "./components/NavBar";
import { Route, Switch } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <NavBar />
      <div className="mt-12 bg-background-color h-[calc(100vh-48px)] flex items-center justify-center">
        <Switch>
          <Route
            exact
            path="/"
            render={() => <h1 className="text-text-color">HomePage</h1>}
          />
          <Route
            exact
            path="/signin"
            render={() => <h1 className="text-text-color">Sign In</h1>}
          />
          <Route
            exact
            path="/signup"
            render={() => <h1 className="text-text-color">Sign Up</h1>}
          />
        </Switch>
      </div>
    </div>
  );
}

export default App;

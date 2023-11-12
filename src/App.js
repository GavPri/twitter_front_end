import logo from "./logo.svg";
import "./App.css";
import NavBar from "./components/NavBar";
import { Route, Switch } from "react-router-dom";
import "./api/axiosDefaults";
import SignUpForm from "./pages/auth/SignUpForm";
import SignInForm from "./pages/auth/SignInForm";
import TweetCreate from "./pages/TweetCreate";
import TweetPage from "./pages/TweetPage";

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
          <Route exact path="/signin" render={() => <SignInForm />} />
          <Route exact path="/signup" render={() => <SignUpForm />} />
          <Route exact path="/tweets/create" render={() => <TweetCreate />} />
          <Route exact path="/tweets/:id" render={() => <TweetPage />} />
        </Switch>
      </div>
    </div>
  );
}

export default App;

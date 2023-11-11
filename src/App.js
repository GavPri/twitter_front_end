import logo from "./logo.svg";
import "./App.css";
import NavBar from "./components/NavBar";
import { Route, Switch } from "react-router-dom";
import "./api/axiosDefaults";
import SignUpForm from "./pages/auth/SignUpForm";
import SignInForm from "./pages/auth/SignInForm";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  // get currently logged in user
  const [currentUser, setCurrentUser] = useState(null);

  const handleMount = async () => {
    try {
      const { data } = await axios.get("dj-rest-auth/user/");
      setCurrentUser(data);
    } catch (err) {
      console.log(error);
    }
  };
  // Use effect to get user on load
  useEffect(() => {
    handleMount();
  }, []);
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
        </Switch>
      </div>
    </div>
  );
}

export default App;

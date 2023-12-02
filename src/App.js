import logo from "./logo.svg";
import "./App.css";
import NavBar from "./components/NavBar";
import { Route, Switch } from "react-router-dom";
import "./api/axiosDefaults";
import SignUpForm from "./pages/auth/SignUpForm";
import SignInForm from "./pages/auth/SignInForm";
import TweetCreate from "./pages/posts/TweetCreate";
import TweetPage from "./pages/posts/TweetPage";
import PostsPage from "./pages/posts/PostsPage";
import { useCurrentUser } from "./contexts/CurrentUserContext";

function App() {
  const currentUser = useCurrentUser();
  const account_id = currentUser?.account_id || " ";

  return (
    <div className="App">
      <NavBar />
      <div className="mt-12 bg-background-color h-[calc(100vh-48px)] flex items-center justify-center">
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <PostsPage message="No results found, adjust the search keyword." />
            )}
          />
          {/* feed */}
          <Route
            exact
            path="/feed"
            render={() => (
              <PostsPage
                message="No results found, adjust the search keyword or follow a user."
                filter={`owner__followed__owner__account=${account_id}&`}
              />
            )}
          />
          {/* sign up & sign in */}
          <Route exact path="/signin" render={() => <SignInForm />} />
          <Route exact path="/signup" render={() => <SignUpForm />} />
          {/* Tweets */}
          <Route exact path="/tweets/create" render={() => <TweetCreate />} />
          <Route exact path="/tweets/:id" render={() => <TweetPage />} />
          {/* Liked  */}
          <Route
            exact
            path="/feed"
            render={() => (
              <PostsPage
                message="No results found, adjust the search keyword or like a post."
                filter={`likes__owner__account=${account_id}&ordering=-likes__created_at&`}
              />
            )}
          />
        </Switch>
      </div>
    </div>
  );
}

export default App;

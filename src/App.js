import "./App.css";
import NavBar from "./components/NavBar";
import { Route, Switch } from "react-router-dom";
import "./api/axiosDefaults";
import SignUpForm from "./pages/auth/SignUpForm";
import SignInForm from "./pages/auth/SignInForm";
import TweetCreate from "./pages/posts/TweetCreate";
import TweetPage from "./pages/posts/TweetPage";

import { useCurrentUser } from "./contexts/CurrentUserContext";
import FeedPage from "./pages/posts/FeedPage";
import AccountPage from "./pages/accounts/AccountPage";
import TweetEdit from "./pages/posts/TweetEditForm";

function App() {
  const currentUser = useCurrentUser();
  const account_id = currentUser?.account_id || " ";

  return (
    <div className="App">
      <NavBar />
      <div className="bg-background-color mt-16 min-h-screen flex flex-col items-center justify-start">
        <Switch>
          {/* Home page/feed */}
          <Route
            exact
            path="/"
            render={() => (
              <FeedPage message="No results found, adjust your search!" />
            )}
          />
          <Route
            exact
            path="/feed"
            render={() => (
              <FeedPage
                message="No results found, adjust your search or follow a user!"
                filter={`owner__followed__owner__account=${account_id}&`}
              />
            )}
          />
          {/* liked post route */}
          <Route
            exact
            path="/liked"
            render={() => (
              <FeedPage
                message="No results found, adjust the search or like a post!"
                filter={`likes__owner__account=${account_id}&ordering=-likes__created_at&`}
              />
            )}
          />
          {/* sign up & sign in */}
          <Route exact path="/signin" render={() => <SignInForm />} />
          <Route exact path="/signup" render={() => <SignUpForm />} />
          {/* Tweets */}
          <Route exact path="/tweets/create" render={() => <TweetCreate />} />
          <Route exact path="/tweets/:id" render={() => <TweetPage />} />
          <Route exact path="/tweets/:id/edit" render={() => <TweetEdit />} />
          {/* Account */}
          <Route exact path="/accounts/:id" render={() => <AccountPage />} />
        </Switch>
      </div>
    </div>
  );
}

export default App;

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

import Card from './features/Ui/Card';
import Signin from './features/auth/Signin/Signin';
import Signup from './features/auth/Signup/Signup';
import SigninWithEmail from './features/auth/Signin/SigninWithEmail';
import SignupWithEmail from './features/auth/Signup/SignupWithEmail';
import Posts from './features/posts/Posts';
import { auth } from './firebase';
import { userSignedin, userSignedout } from './features/auth/auth-slice';

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  // add auth listener to the app
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        // exctract user credential
        const userName = user.displayName;
        const email = user.email;
        const photoURL = user.photoURL;
        const emailVerified = user.emailVerified;
        const uid = user.uid;

        const userData = {
          userName,
          email,
          photoURL,
          emailVerified,
          uid,
        };
        dispatch(userSignedin(userData));
      } else {
        dispatch(userSignedout());
      }
    });

    return unsubscribe;
  }, [dispatch]);

  return (
    <BrowserRouter>
      <div className="flex items-center justify-center w-screen h-screen bg-gray-200">
        <Switch>
          {!user && (
            <Route path="/signup" exact>
              <Card>
                <Signup />
              </Card>
            </Route>
          )}
          {!user && (
            <Route path="/signin" exact>
              <Card>
                <Signin />
              </Card>
            </Route>
          )}
          {!user && (
            <Route path="/signin/email">
              <Card>
                <SigninWithEmail />
              </Card>
            </Route>
          )}
          {!user && (
            <Route path="/signup/email">
              <Card>
                <SignupWithEmail />
              </Card>
            </Route>
          )}

          <Route path="/posts">
            <Posts />
          </Route>
          <Route path="*">
            <Redirect to="/posts" />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;

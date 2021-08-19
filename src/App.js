import { useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Card from './features/Ui/Card';
import Signin from './features/auth/Signin/Signin';
import Signup from './features/auth/Signup/Signup';
import SigninWithEmail from './features/auth/Signin/SigninWithEmail';
import SignupWithEmail from './features/auth/Signup/SignupWithEmail';
import { auth } from './firebase';
import { userSignedin, userSignedout } from './features/auth/auth-slice';
import { useDispatch } from 'react-redux';

function App() {
  const dispatch = useDispatch();

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
          <Card>
            <Route path="/signup" exact>
              <Signup />
            </Route>
            <Route path="/signin" exact>
              <Signin />
            </Route>
            <Route path="/signin/email">
              <SigninWithEmail />
            </Route>
            <Route path="/signup/email">
              <SignupWithEmail />
            </Route>
          </Card>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;

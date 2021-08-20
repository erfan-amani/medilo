import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

import Card from './features/Ui/Card';
import Signin from './features/auth/Signin';
import Posts from './features/posts/Posts';
import Profile from './features/profile/Profile';
import { auth } from './firebase';
import { userSignedin, userSignedout } from './features/auth/auth-slice';
import Nav from './features/layout/Nav';

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
        const photoURL =
          user.photoURL || 'gs://medilo.appspot.com/default-avatar.jpg';
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
      <Switch>
        {!user && (
          <Route path="/signin" exact>
            <div className="flex items-center justify-center w-screen h-screen bg-gray-200">
              <Signin />
            </div>
          </Route>
        )}
        <div className="relative h-screen w-screen bg-white overflow-x-hidden">
          <Nav />
          <Route path="/posts">
            <Posts />
          </Route>
          <Route path="/profile">
            <Profile />
          </Route>
          <Route path="*">
            <Redirect to="/posts" />
          </Route>
        </div>
      </Switch>
    </BrowserRouter>
  );
}

export default App;

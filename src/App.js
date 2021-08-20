import { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

import Signin from './features/auth/Signin';
import Posts from './features/posts/Posts';
import Profile from './features/profile/Profile';
import { auth } from './firebase';
import { userSignedin, userNotFound } from './features/auth/auth-slice';
import Nav from './features/layout/Nav';
import NewPost from './features/posts/newPost/NewPost';

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
        dispatch(userNotFound());
      }
    });

    return unsubscribe;
  }, [dispatch]);

  return (
    <BrowserRouter>
      <div className="relative h-screen w-screen bg-white overflow-x-hidden">
        <Switch>
          {!user && (
            <Route path="/signin" exact>
              <div className="flex items-center justify-center w-full h-full bg-gray-200">
                <Signin />
              </div>
            </Route>
          )}
          <Fragment>
            <Nav />
            <Route path="/posts">
              <Posts />
            </Route>
            {user && (
              <Fragment>
                <Route path="/profile">
                  <Profile />
                </Route>
                <Route path="/new">
                  <NewPost />
                </Route>
              </Fragment>
            )}
            <Route path="*">
              <Redirect to="/posts" />
            </Route>
          </Fragment>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;

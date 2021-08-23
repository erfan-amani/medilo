import { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

import Signin from './features/auth/Signin';
import Posts from './features/posts/Posts';
import Profile from './features/profile/Profile';
import { auth, db } from './firebase';
import { userSignedin, userNotFound } from './features/auth/auth-slice';
import Nav from './features/layout/Nav';
import NewPost from './features/posts/newPost/NewPost';
import {
  failedFetching,
  startedFetching,
  completedFetching,
} from './features/posts/posts-slice';
import Search from './features/search/Search';
import PostDetail from './features/posts/postDetail/PostDetail';

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  // Set auth listener
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        // exctract user credential
        const userName = user.displayName;
        const email = user.email;
        const photoURL =
          user.photoURL || 'gs://medilo.appspot.com/default-avatar.jpg';
        const emailVerified = user.emailVerified;
        const userId = user.uid;

        const userData = {
          userName,
          email,
          photoURL,
          emailVerified,
          userId,
        };
        dispatch(userSignedin(userData));
      } else {
        dispatch(userNotFound());
      }
    });

    return unsubscribe;
  }, [dispatch]);

  // Set db listener
  useEffect(() => {
    dispatch(startedFetching());

    const unsubscribe = db
      .collection('posts')
      .orderBy('timestamp', 'desc')
      .onSnapshot(
        (snapshot) => {
          const posts = snapshot.docs.map((doc) => {
            const data = doc.data();
            return {
              ...data,
              id: doc.id,
              timestamp: { ...data.timestamp },
            };
          });
          const userId = user ? user.userId : null;

          dispatch(completedFetching({ items: posts, userId }));
        },
        (error) => {
          dispatch(failedFetching(error.message));
        }
      );

    return unsubscribe;
  }, [dispatch, user]);

  return (
    <BrowserRouter>
      <div className="pb-58px relative h-auto md:pb-0 min-h-screen md:h-screen w-screen bg-white overflow-x-hidden">
        <Switch>
          {!user && (
            <Route path="/signin" exact>
              <div className="absolute flex items-center justify-center w-full h-full bg-gray-200">
                <Signin />
              </div>
            </Route>
          )}
          <Fragment>
            <Nav />
            <Route path="/posts" exact>
              <Posts />
            </Route>
            <Route path="/posts/:postId">
              <PostDetail />
            </Route>
            <Route path="/search">
              <Search />
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

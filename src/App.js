import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  BrowserRouter,
  Redirect,
  Route,
  Switch,
  useHistory,
} from 'react-router-dom';

import Signin from './features/auth/Signin';
import Posts from './features/posts/Posts';
import Profile from './features/profile/Profile';
import { auth, db } from './firebase';
import { userFound, userNotFound } from './features/auth/auth-slice';
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
    const unsubscribe = auth.onAuthStateChanged((fetchedUser) => {
      if (fetchedUser) {
        // exctract user credential
        const userName = fetchedUser.displayName;
        const email = fetchedUser.email;
        const photoURL =
          fetchedUser.photoURL ||
          'https://firebasestorage.googleapis.com/v0/b/medilo.appspot.com/o/default-avatar.jpg?alt=media&token=55dfeb5a-6842-418c-9592-6efee7ee52bc';
        const userId = fetchedUser.uid;

        const userData = {
          userName,
          email,
          photoURL,
          userId,
        };

        dispatch(userFound(userData));
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

          dispatch(completedFetching(posts));
        },
        (error) => {
          dispatch(failedFetching(error.message));
        }
      );

    return unsubscribe;
  }, [dispatch]);

  return (
    <BrowserRouter>
      <div className="pb-58px relative h-auto md:pb-0 min-h-screen md:h-screen w-screen bg-white overflow-x-hidden">
        <Nav />
        <Switch>
          {!user && (
            <Route path="/signin" exact>
              <Signin />
            </Route>
          )}
          <Route path="/posts" exact>
            <Posts />
          </Route>
          <Route path="/posts/:postId">
            <PostDetail />
          </Route>
          <Route path="/search">
            <Search />
          </Route>
          <Route path="/profile/:userId">
            <Profile />
          </Route>
          {user && (
            <Route path="/profile">
              <Profile />
            </Route>
          )}
          {user && (
            <Route path="/new">
              <NewPost />
            </Route>
          )}
          <Redirect to="/posts" />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;

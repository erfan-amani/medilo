import { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Card from '../Ui/Card';
import LoadingSpinner from '../Ui/LoadingSpinner';
import GithubButton from './AuthButtons/GithubButton';
import GoogleButton from './AuthButtons/GoogleButton';
import TwitterButton from './AuthButtons/TwitterButton';
import { siginStarted, siginFailed, siginSucceed } from './auth-slice';
import firebase, { auth } from './../../firebase';
import './AuthButtons/AuthButton.css';

const Signin = () => {
  const dispatch = useDispatch();
  const error = useSelector((state) => state.auth.error);
  const status = useSelector((state) => state.auth.status);

  const githubSignHanlder = async () => {
    dispatch(siginStarted());
    try {
      await auth.signInWithPopup(new firebase.auth.GithubAuthProvider());
      dispatch(siginSucceed());
    } catch (error) {
      console.log(error);
      dispatch(siginFailed(error.message));
    }
  };

  const googleSignHandler = async () => {
    dispatch(siginStarted());
    try {
      await auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
      dispatch(siginSucceed());
    } catch (error) {
      console.log(error);
      dispatch(siginFailed(error.message));
    }
  };

  const twitterSignHandler = async () => {
    dispatch(siginStarted());
    try {
      await auth.signInWithPopup(new firebase.auth.TwitterAuthProvider());
      dispatch(siginSucceed());
    } catch (error) {
      console.log(error);
      dispatch(siginFailed(error.message));
    }
  };

  return (
    <Card>
      <div className="text-center">
        <h2 className="text-2xl md:text-3xl text-gray-800 font-bold">
          Sign In
        </h2>
        <p className="text-gray-700">enter to your account</p>
      </div>
      <div className="flex flex-col gap-2 w-full">
        {status === 'error' && error && (
          <p className="bg-red-100 text-red-500 border-2 border-red-400 py-2 px-4 my-4">
            {error}
          </p>
        )}
        {status !== 'pending' ? (
          <Fragment>
            <GoogleButton authHandler={googleSignHandler} />
            <TwitterButton authHandler={twitterSignHandler} />
            <GithubButton authHandler={githubSignHanlder} />
          </Fragment>
        ) : (
          <LoadingSpinner />
        )}
      </div>
    </Card>
  );
};

export default Signin;

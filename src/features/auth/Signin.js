import { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Card from '../Ui/Card';
import LoadingSpinner from '../Ui/LoadingSpinner';
import GithubButton from './AuthButtons/GithubButton';
import GoogleButton from './AuthButtons/GoogleButton';
import TwitterButton from './AuthButtons/TwitterButton';
import { userSignedin } from './auth-slice';
import firebase from './../../firebase';
import './AuthButtons/AuthButton.css';

const Signin = () => {
  const dispatch = useDispatch();
  const error = useSelector((state) => state.auth.error);
  const status = useSelector((state) => state.auth.status);

  const githubSignHanlder = async () => {
    const provider = new firebase.auth.GithubAuthProvider();
    dispatch(userSignedin(provider));
  };

  const googleSignHandler = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    dispatch(userSignedin(provider));
  };

  const twitterSignHandler = async () => {
    const provider = new firebase.auth.TwitterAuthProvider();
    dispatch(userSignedin(provider));
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
        {status === 'failed' && error && (
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

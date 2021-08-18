import { Fragment } from 'react';

import FacebookButton from './AuthButtons/FacebookButton';
import GithubButton from './AuthButtons/GithubButton';
import GoogleButton from './AuthButtons/GoogleButton';
import EmailButton from './AuthButtons/EmailButton';
import TwitterButton from './AuthButtons/TwitterButton';
import './AuthButtons/AuthButton.css';
import { Link } from 'react-router-dom';

const Signin = () => {
  return (
    <Fragment>
      <div className="text-center">
        <h2 className="text-2xl md:text-3xl text-gray-800 font-bold">
          Sign In
        </h2>
        <p className="text-gray-700">enter to your account</p>
      </div>
      <div className="space-y-2 w-full">
        <GoogleButton />
        <FacebookButton />
        <EmailButton />
        <TwitterButton />
        <GithubButton />
      </div>
    </Fragment>
  );
};

export default Signin;

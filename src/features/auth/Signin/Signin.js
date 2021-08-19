import { Fragment } from 'react';
import { Link } from 'react-router-dom';

import GithubButton from '../AuthButtons/GithubButton';
import GoogleButton from '../AuthButtons/GoogleButton';
import TwitterButton from '../AuthButtons/TwitterButton';
import '../AuthButtons/AuthButton.css';

const Signin = () => {
  return (
    <Fragment>
      <div className="text-center">
        <h2 className="text-2xl md:text-3xl text-gray-800 font-bold">
          Sign In
        </h2>
        <p className="text-gray-700">enter to your account</p>
      </div>
      <div className="flex flex-col gap-2 w-full">
        <GoogleButton />
        <TwitterButton />
        <GithubButton />
      </div>
      <div className="text-gray-700 mt-8">
        No account ? {}
        <Link to="/signup" className="underline text-gray-800">
          Create one
        </Link>
      </div>
    </Fragment>
  );
};

export default Signin;

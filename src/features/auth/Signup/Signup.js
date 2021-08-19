import { Fragment } from 'react';
import { Link } from 'react-router-dom';

// import FacebookButton from '../AuthButtons/FacebookButton';
import GithubButton from '../AuthButtons/GithubButton';
import GoogleButton from '../AuthButtons/GoogleButton';
import EmailButton from '../AuthButtons/EmailButton';
import TwitterButton from '../AuthButtons/TwitterButton';
import '../AuthButtons/AuthButton.css';

const Signup = () => {
  return (
    <Fragment>
      <div className="text-center">
        <h2 className="text-2xl md:text-3xl text-gray-800 font-bold">
          Sign Up
        </h2>
        <p className="text-gray-700">create an account</p>
      </div>
      <div className="flex flex-col gap-2 w-full">
        <GoogleButton />
        {/* <FacebookButton /> */}
        <Link to="/signup/email">
          <EmailButton />
        </Link>
        <TwitterButton />
        <GithubButton />
      </div>
      <div className="text-gray-700 mt-8">
        Already have account ? {}
        <Link to="/signin" className="underline text-gray-800">
          Log in
        </Link>
      </div>
    </Fragment>
  );
};

export default Signup;

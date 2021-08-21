import { useDispatch } from 'react-redux';

import Card from '../Ui/Card';
import GithubButton from './AuthButtons/GithubButton';
import GoogleButton from './AuthButtons/GoogleButton';
import TwitterButton from './AuthButtons/TwitterButton';
import { authWithGithub, authWithGoogle, authWithTwitter } from './auth-slice';
import './AuthButtons/AuthButton.css';

const Signin = () => {
  const dispatch = useDispatch();

  const githubSignHanlder = () => {
    dispatch(authWithGithub());
  };

  const googleSignHandler = () => {
    dispatch(authWithGoogle());
  };

  const twitterSignHandler = () => {
    dispatch(authWithTwitter());
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
        <GoogleButton authHandler={googleSignHandler} />
        <TwitterButton authHandler={twitterSignHandler} />
        <GithubButton authHandler={githubSignHanlder} />
      </div>
    </Card>
  );
};

export default Signin;

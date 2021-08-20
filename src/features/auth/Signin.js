import GithubButton from './AuthButtons/GithubButton';
import GoogleButton from './AuthButtons/GoogleButton';
import TwitterButton from './AuthButtons/TwitterButton';
import './AuthButtons/AuthButton.css';
import Card from '../Ui/Card';

const Signin = () => {
  return (
    <Card>
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
    </Card>
  );
};

export default Signin;

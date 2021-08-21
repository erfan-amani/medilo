import GoogleIcon from '../../Ui/Icons/GoogleIcon';

const GoogleButton = ({ authHandler }) => {
  return (
    <button type="button" className="button" onClick={authHandler}>
      <GoogleIcon className="rounded-2xl" />
      <span className="button-label">Sign in with Google</span>
    </button>
  );
};

export default GoogleButton;

import GoogleIcon from '../../Ui/Icons/GoogleIcon';

const GoogleButton = () => {
  return (
    <button type="button" className="button">
      <GoogleIcon className="rounded-2xl" />
      <span className="button-label">Sign in with Google</span>
    </button>
  );
};

export default GoogleButton;

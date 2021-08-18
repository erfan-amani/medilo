import TwitterIcon from '../../Ui/Icons/TwitterIcon';

const TwitterButton = () => {
  return (
    <button type="button" className="button">
      <TwitterIcon />
      <span className="button-label">Sign in with Google</span>
    </button>
  );
};
export default TwitterButton;

import TwitterIcon from '../../Ui/Icons/TwitterIcon';

const TwitterButton = ({ authHandler }) => {
  return (
    <button type="button" className="button" onClick={authHandler}>
      <TwitterIcon />
      <span className="button-label">Sign in with Google</span>
    </button>
  );
};
export default TwitterButton;

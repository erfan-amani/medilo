import EmailIcon from '../../Ui/Icons/EmailIcon';

const EmailButton = () => {
  return (
    <button type="button" className="button">
      <EmailIcon />
      <span className="button-label">Sign in with Google</span>
    </button>
  );
};
export default EmailButton;

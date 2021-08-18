import GithubIcon from '../../Ui/Icons/GithubIcon';

const GithubButton = () => {
  return (
    <button type="button" className="button">
      <GithubIcon className="rounded-2xl" />
      <p className="button-label">Log in with Github</p>
    </button>
  );
};

export default GithubButton;

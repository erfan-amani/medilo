import { useDispatch } from 'react-redux';

import GithubIcon from '../../Ui/Icons/GithubIcon';
import { authWithGithub } from '../auth-slice';

const GithubButton = () => {
  const dispatch = useDispatch();

  const authHandler = () => {
    dispatch(authWithGithub());
  };

  return (
    <button type="button" className="button" onClick={authHandler}>
      <GithubIcon className="rounded-2xl" />
      <p className="button-label">Log in with Github</p>
    </button>
  );
};

export default GithubButton;

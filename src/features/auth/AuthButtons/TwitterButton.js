import { useDispatch } from 'react-redux';

import TwitterIcon from '../../Ui/Icons/TwitterIcon';
import { authWithTwitter } from '../auth-slice';

const TwitterButton = () => {
  const dispatch = useDispatch();

  const authHandler = () => {
    dispatch(authWithTwitter());
  };

  return (
    <button type="button" className="button" onClick={authHandler}>
      <TwitterIcon />
      <span className="button-label">Sign in with Google</span>
    </button>
  );
};
export default TwitterButton;

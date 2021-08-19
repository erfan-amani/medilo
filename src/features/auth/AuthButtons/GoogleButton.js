import { useDispatch } from 'react-redux';

import GoogleIcon from '../../Ui/Icons/GoogleIcon';
import { authWithGoogle } from '../auth-slice';

const GoogleButton = () => {
  const dispatch = useDispatch();

  const authHandler = async () => {
    dispatch(authWithGoogle());
  };

  return (
    <button type="button" className="button" onClick={authHandler}>
      <GoogleIcon className="rounded-2xl" />
      <span className="button-label">Sign in with Google</span>
    </button>
  );
};

export default GoogleButton;

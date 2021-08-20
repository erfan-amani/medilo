import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { signout } from '../auth/auth-slice';

const Profile = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const signOutHandler = () => {
    dispatch(signout());
    history.push('/posts');
  };

  return (
    <div>
      <button
        type="button"
        onClick={signOutHandler}
        className="py-2 px-4 bg-blue-500 text-white rounded-lg"
      >
        Sign Out
      </button>
    </div>
  );
};

export default Profile;

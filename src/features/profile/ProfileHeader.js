import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { signout } from '../auth/auth-slice';

const ProfileHeader = () => {
  const user = useSelector((state) => state.auth.user);

  const history = useHistory();
  const dispatch = useDispatch();

  const signOutHandler = () => {
    dispatch(signout());
    history.push('/posts');
  };

  return (
    <div className="flex gap-4 border-b-2 px-4 md:px-0 py-3 md:pb-8">
      <img
        src={user.photoURL}
        alt=""
        className="w-14 h-14 md:w-16 md:h-16 rounded-full"
      />
      <div className="flex-grow">
        <h2 className="font-bold text-xl">{user.userName}</h2>
        {user.email ? (
          <a href={`mailto:${user.email}`} className="text-gray-700 italic">
            Contact me
          </a>
        ) : (
          <p>No contact email found!</p>
        )}
      </div>
      <div className="self-center">
        <button
          type="button"
          onClick={signOutHandler}
          className="py-1.5 px-4 font-semibold bg-blue-500 text-white rounded-lg"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default ProfileHeader;

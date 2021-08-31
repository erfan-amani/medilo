import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import SettingIcon from '../Ui/Icons/SettingIcon';

const ProfileHeader = ({ user }) => {
  const signedInUserId = useSelector((state) => state.auth.user?.userId);
  const location = useLocation();

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
      {signedInUserId && (
        <Link to={`${location.pathname}/setting`}>
          <SettingIcon />
        </Link>
      )}
    </div>
  );
};

export default ProfileHeader;

import { Fragment, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import LoadingSpinner from '../Ui/LoadingSpinner';
import ProfileHeader from './ProfileHeader';
import UserPostList from './UserPostList';

const Profile = () => {
  const { userId } = useParams();
  const [loading, setLoading] = useState(true);

  const user = useSelector((state) =>
    state.users.list.find((u) => u.userId === userId)
  );

  // remove loading when got user data
  useEffect(() => {
    if (user) {
      setLoading(false);
    }
  }, [user]);

  return (
    <div className="w-full h-full bg-gray-200 md:py-8 mb-4">
      <div className="flex flex-col h-full md:h-auto md:gap-8 m-auto bg-white w-full md:w-2/3 xl:w-1/2 md:p-4 md:p-8 text-gray-800 shadow-md">
        {userId && !loading && (
          <Fragment>
            <ProfileHeader user={user} />
            <UserPostList userId={userId} />
          </Fragment>
        )}
        {loading && (
          <div className="py-20 text-center">
            <LoadingSpinner />
            <p className="text-purple-800 font-bold text-xl mt-4">
              Loading user...
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;

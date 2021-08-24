import { Fragment, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { db } from '../../firebase';
import LoadingSpinner from '../Ui/LoadingSpinner';
import ProfileHeader from './ProfileHeader';
import UserPostList from './UserPostList';

const Profile = () => {
  const history = useHistory();
  const { userId } = useParams();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({});

  useEffect(() => {
    setLoading(true);

    const fetchUser = () => {
      db.collection('users')
        .doc(userId)
        .get()
        .then((fetchedUser) => {
          setLoading(false);
          setUser(fetchedUser.data());
        })
        .catch(() => {
          history.replace('/posts');
          return;
        });
    };

    fetchUser();
  }, [userId, history]);

  return (
    <div className="w-full h-full bg-gray-200 md:py-8 mb-4">
      <div className="flex flex-col h-full md:h-auto md:gap-8 m-auto bg-white w-full md:w-2/3 xl:w-1/2 md:p-4 md:p-8 text-gray-800 shadow-md">
        {user.userId && !loading && (
          <Fragment>
            <ProfileHeader user={user} />
            <UserPostList userId={userId} />
          </Fragment>
        )}
        {loading && <LoadingSpinner />}
      </div>
    </div>
  );
};

export default Profile;

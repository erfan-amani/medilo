import ProfileHeader from './ProfileHeader';
import UserPostList from './UserPostList';

const Profile = () => {
  return (
    <div className="w-full h-full bg-gray-200 md:py-8 mb-4">
      <div className="flex flex-col h-full md:h-auto md:gap-8 m-auto bg-white w-full md:w-2/3 xl:w-1/2 md:p-4 md:p-8 text-gray-800 shadow-md">
        <ProfileHeader />
        <UserPostList />
      </div>
    </div>
  );
};

export default Profile;

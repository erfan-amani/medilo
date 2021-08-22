import { useSelector } from 'react-redux';
import UserPostItem from './UserPostItem';

const UserPostList = () => {
  const userPosts = useSelector((state) => state.posts.userPosts);

  return (
    <div className="grid grid-cols-3 lg:grid-cols-4 pb-14">
      {userPosts.map((post) => (
        <UserPostItem key={post.id} image={post.image} />
      ))}
    </div>
  );
};

export default UserPostList;

import { useSelector } from 'react-redux';
import PostListSmall from '../Ui/posts/PostListSmall';

const UserPostList = () => {
  const userPosts = useSelector((state) => state.posts.userPosts);

  return <PostListSmall posts={userPosts} />;
};

export default UserPostList;

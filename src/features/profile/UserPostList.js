import { useSelector } from 'react-redux';
import PostListSmall from '../Ui/posts/PostListSmall';

const UserPostList = ({ userId }) => {
  const userPosts = useSelector((state) =>
    state.posts.items.filter((post) => post.userId === userId)
  );

  return <PostListSmall posts={userPosts} />;
};

export default UserPostList;

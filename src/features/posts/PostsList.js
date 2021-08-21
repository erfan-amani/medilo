import { useSelector } from 'react-redux';
import PostItem from './PostItem';

const PostsList = () => {
  const posts = useSelector((state) => state.posts.items);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 justify-items-center min-h-full py-8 gap-8 overflow-x-hidden">
      {posts.map((p) => (
        <PostItem key={p.id} {...p} />
      ))}
    </div>
  );
};

export default PostsList;

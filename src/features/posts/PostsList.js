import { useSelector } from 'react-redux';
import PostItem from './PostItem';

import LoadingSpinner from '../Ui/LoadingSpinner';
import { Link } from 'react-router-dom';

const PostsList = () => {
  const posts = useSelector((state) => state.posts.items);
  const status = useSelector((state) => state.posts.status);
  const error = useSelector((state) => state.posts.error);

  let content = (
    <div className="text-center text-lg">
      <p className="text-purple-900 mb-4">No post founded. Be the first one </p>
      <Link to="/new" className="py-2 px-4 bg-purple-700 text-white rounded-lg">
        Add first post 🤟
      </Link>
    </div>
  );

  if (status === 'completed' && posts.length > 0) {
    content = posts.map((p) => <PostItem key={p.id} {...p} />);
  }

  if (status === 'pending') {
    content = (
      <div className="pt-20">
        <LoadingSpinner />
        <p className="text-purple-800 font-bold text-xl mt-4">
          Loading posts...
        </p>
      </div>
    );
  }

  if (status === 'error' && error) {
    content = (
      <div className="text-center text-lg">
        <p className="text-red-600 mb-4">Something went wrong ⚠ </p>
        <p className="text-gray-800">{error}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 justify-items-center min-h-full py-8 gap-8 overflow-x-hidden">
      {content}
    </div>
  );
};

export default PostsList;

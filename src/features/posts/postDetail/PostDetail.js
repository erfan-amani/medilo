import { useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

import PostImage from '../../Ui/posts/PostImage';
import fallbackSrc from '../../../assets/images/failed-post.jpg';
import PostData from './PostData';
import Comments from './comments/Comments';

const PostDetail = () => {
  const history = useHistory();
  const { postId } = useParams();
  const postData = useSelector((state) =>
    state.posts.items.find((item) => item.id === postId)
  );

  if (!postData) {
    history.replace('/posts');
    return null;
  }

  return (
    <div
      className="flex w-full bg-gray-200 mb-14 md:py-16"
      style={{ height: 'calc(100% - 58px)' }}
    >
      <div className="flex flex-col h-full md:flex-row bg-white w-full md:m-auto md:w-5/6 text-gray-800 shadow-md mb-14">
        <PostImage
          src={postData.image}
          fallbackSrc={fallbackSrc}
          className="w-full h-auto object-contain"
        />
        <div className="flex flex-col w-full h-full p-4 pb-1 md:pb-4">
          <PostData {...postData} />
          <Comments postId={postId} />
        </div>
      </div>
    </div>
  );
};

export default PostDetail;

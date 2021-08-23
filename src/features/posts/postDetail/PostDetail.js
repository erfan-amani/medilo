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
      className="flex w-full h-full bg-gray-200 md:py-16"
      // style={{ height: 'calc(100% - 58px)' }}
    >
      <div
        className="flex flex-col md:flex-row w-px bg-white md:m-auto w-full md:w-5/6 xl:w-2/3 text-gray-800 md:shadow-md"
        style={{ height: 'fit-content' }}
      >
        <div>
          <PostImage
            src={postData.image}
            fallbackSrc={fallbackSrc}
            className="image-detail w-full object-contain"
          />
        </div>
        <div className="flex flex-col w-full p-4 pb-1 md:pb-4">
          <PostData {...postData} />
          <Comments postId={postId} />
        </div>
      </div>
    </div>
  );
};

export default PostDetail;

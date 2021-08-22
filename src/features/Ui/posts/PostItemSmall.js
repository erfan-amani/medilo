import PostImage from './PostImage';
import failedImage from '../../../assets/images/failed-post.jpg';

import './PostItemSmall.css';

const PostItemSmall = ({ image }) => {
  return (
    <div className="image-container relative w-full h-full bg-gray-400 border border-white">
      <PostImage
        src={image}
        fallbackSrc={failedImage}
        className="absolute top-0 bottom-0 right-0 left-0 h-full w-full"
      />
    </div>
  );
};

export default PostItemSmall;

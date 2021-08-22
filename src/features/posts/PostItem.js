import { useSelector } from 'react-redux';

import CommentIcon from '../Ui/Icons/CommentIcon';
import LikeIcon from '../Ui/Icons/LikeIcon';

import failedImage from '../../assets/images/failed-post.jpg';
import PostImage from '../Ui/posts/PostImage';

const PostItem = ({ id, caption, userName, userProfile, image }) => {
  const user = useSelector((state) => state.auth.user);

  return (
    <div className="w-full w-max">
      <PostImage src={image} fallbackSrc={failedImage} className="w-96 h-96" />

      <div className="flex items-center gap-4 py-2 px-4 border-l-2 border-r-2 border-b-2">
        <picture>
          <source srcSet={userProfile} className="rounded-full w-10 h-10" />
          <img
            src="https://firebasestorage.googleapis.com/v0/b/medilo.appspot.com/o/default-avatar.jpg?alt=media&token=55dfeb5a-6842-418c-9592-6efee7ee52bc"
            alt={userName + 'profile'}
            className="rounded-full w-10 h-10"
          />
        </picture>
        <div className="flex flex-col flex-grow text-gray-800">
          <h3 className="font-medium leading-4">{userName}</h3>
          <p className="text-sm text-gray-600 leading-4">two minutes ago</p>
        </div>
        {user && (
          <div className="flex gap-3">
            <CommentIcon />
            <LikeIcon />
          </div>
        )}
      </div>
    </div>
  );
};

export default PostItem;

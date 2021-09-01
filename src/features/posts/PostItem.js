import { useSelector } from 'react-redux';
import { formatDistanceToNow } from 'date-fns';

import CommentIcon from '../Ui/Icons/CommentIcon';
import LikeIcon from '../Ui/Icons/LikeIcon';

import failedImage from '../../assets/images/failed-post.jpg';
import PostImage from '../Ui/posts/PostImage';
import { Link } from 'react-router-dom';

const PostItem = ({ id, image, timestamp, userId }) => {
  const user = useSelector((state) =>
    state.users.list.find((u) => u.userId === userId)
  );
  const userLogedin = !!useSelector((state) => state.auth.user);

  const timeDistance = formatDistanceToNow(new Date(timestamp.seconds * 1000));

  if (!user) {
    console.log('user not found');
    return null;
  }

  return (
    <div className="w-full w-max">
      <Link to={`/posts/${id}`} className="cursor-pointer">
        <PostImage
          src={image}
          fallbackSrc={failedImage}
          className="w-96 h-96"
        />
      </Link>

      <div className="flex items-center gap-4 py-2 px-4 border-l-2 border-r-2 border-b-2">
        <Link to={`/profile/${userId}`}>
          <picture>
            <source srcSet={user.photoURL} className="rounded-full w-10 h-10" />
            <img
              src="https://firebasestorage.googleapis.com/v0/b/medilo.appspot.com/o/default-avatar.jpg?alt=media&token=55dfeb5a-6842-418c-9592-6efee7ee52bc"
              alt={user.userName + 'profile'}
              className="rounded-full w-10 h-10"
            />
          </picture>
        </Link>
        <div className="flex flex-col flex-grow text-gray-800">
          <Link to={`/profile/${userId}`} className="font-medium leading-4">
            {user.userName}
          </Link>
          <p className="text-sm text-gray-600 leading-4">{timeDistance} ago</p>
        </div>
        {userLogedin && (
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

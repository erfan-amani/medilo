import { useSelector } from 'react-redux';

const { default: CommentIcon } = require('../Ui/Icons/CommentIcon');
const { default: LikeIcon } = require('../Ui/Icons/LikeIcon');

const PostItem = ({ id, caption, userName, photoURL, image }) => {
  const user = useSelector((state) => state.auth.user);

  return (
    <div className="w-full w-max">
      <img
        src={image}
        alt="post"
        className="h-96 w-96 object-cover object-center"
      />
      <div className="flex items-center gap-4 py-2 px-4 border-l-2 border-r-2 border-b-2">
        <img
          src={photoURL}
          alt={userName + 'profile'}
          className="rounded-full w-10 h-10"
        />
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

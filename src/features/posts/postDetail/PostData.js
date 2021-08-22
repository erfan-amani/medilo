import { formatDistanceToNow } from 'date-fns';
import { Link } from 'react-router-dom';

const PostData = ({
  caption,
  userName,
  userId,
  userProfile,
  id,
  timestamp,
}) => {
  const timeDistance = formatDistanceToNow(new Date(timestamp.seconds * 1000));

  return (
    <div className="flex flex-col w-full p-4">
      <div className="flex border-b-2 pb-4 border-gray-300 gap-3">
        <Link to={`/user/${userId}`}>
          <picture>
            <source srcSet={userProfile} className="rounded-full w-10 h-10" />
            <img
              src="https://firebasestorage.googleapis.com/v0/b/medilo.appspot.com/o/default-avatar.jpg?alt=media&token=55dfeb5a-6842-418c-9592-6efee7ee52bc"
              alt={userName + 'profile'}
              className="rounded-full w-10 h-10"
            />
          </picture>
        </Link>
        <div className="flex flex-col">
          <Link to={`/user/${userId}`} className="flex-grow">
            <h3 className="font-semibold leading-4">{userName}</h3>
          </Link>
          <p className="text-sm text-gray-600 leading-4">{timeDistance} ago</p>
        </div>
      </div>
      <div className="py-4 flex-grow">
        <Link to={`/user/${userId}`} className="font-semibold text-md pr-2">
          {userName}
        </Link>
        <span>
          {caption}
          {caption}
          {caption}
          {caption}
          {caption}
        </span>
        <p className="pt-2 text-gray-600 cursor-pointer w-max">View comments</p>
      </div>
      <form className="flex py-2 border-t-2 items-center">
        <input
          type="text"
          placeholder="Add a comment..."
          className="flex-grow focus:outline-none"
        />
        <button
          type="submit"
          className="text-blue-700 disabled:cursor-not-allowed"
        >
          post
        </button>
      </form>
    </div>
  );
};

export default PostData;

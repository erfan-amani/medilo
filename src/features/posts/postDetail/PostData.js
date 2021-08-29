import { formatDistanceToNow } from 'date-fns';
import { Link } from 'react-router-dom';

const PostData = ({ caption, user, id, timestamp }) => {
  const timeDistance = formatDistanceToNow(new Date(timestamp.seconds * 1000));

  return (
    <div>
      <div className="flex border-b-2 pb-4 border-gray-300 gap-3">
        <Link to={`/profile/${user.userId}`}>
          <picture>
            <source srcSet={user.photoURL} className="rounded-full w-10 h-10" />
            <img
              src="https://firebasestorage.googleapis.com/v0/b/medilo.appspot.com/o/default-avatar.jpg?alt=media&token=55dfeb5a-6842-418c-9592-6efee7ee52bc"
              alt={user.userName + 'profile'}
              className="rounded-full w-10 h-10"
            />
          </picture>
        </Link>
        <div className="flex flex-col">
          <Link to={`/profile /${user.userId}`} className="flex-grow">
            <h3 className="font-semibold leading-4">{user.userName}</h3>
          </Link>
          <p className="text-sm text-gray-600 leading-4">{timeDistance} ago</p>
        </div>
      </div>
      <div className="py-4 mb-4">
        <Link
          to={`/user/${user.userId}`}
          className="font-semibold text-md pr-2"
        >
          {user.userName}
        </Link>
        <span>{caption}</span>
      </div>
    </div>
  );
};

export default PostData;

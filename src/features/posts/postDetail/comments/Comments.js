import { Fragment, useState } from 'react';
import { useSelector } from 'react-redux';
import CommentForm from './CommentForm';
import CommentsList from './CommentsList';

const Comments = ({ postId }) => {
  const user = useSelector((state) => state.auth.user);
  const [isCommentsVisible, setIsCommentsVisible] = useState(false);

  const showCommentHandler = () => {
    setIsCommentsVisible(true);
  };

  return (
    <div className="flex flex-col flex-grow">
      {/* view comments | comments */}
      {!isCommentsVisible ? (
        <p
          className="pt-2 text-gray-600 cursor-pointer w-max flex-grow"
          onClick={showCommentHandler}
        >
          View comments
        </p>
      ) : (
        <p className="pt-2 text-gray-600 w-max">Comments</p>
      )}
      {/* comments list | nothing */}
      {isCommentsVisible && <CommentsList postId={postId} />}
      {/* comment form | login to write comment */}
      {user ? (
        <CommentForm postId={postId} user={user} />
      ) : (
        <p className="flex border-t-2 items-center py-1">
          Login to write comment
        </p>
      )}
    </div>
  );
};

export default Comments;

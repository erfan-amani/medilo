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
    <Fragment>
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
      {isCommentsVisible && <CommentsList postId={postId} />}
      {user ? (
        <CommentForm postId={postId} user={user} />
      ) : (
        <p className="flex border-t-2 items-center py-1">
          Login to write comment
        </p>
      )}
    </Fragment>
  );
};

export default Comments;

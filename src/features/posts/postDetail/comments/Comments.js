import { Fragment, useState } from 'react';
import CommentForm from './CommentForm';
import CommentsList from './CommentsList';

const Comments = ({ postId }) => {
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
      <CommentForm postId={postId} />
    </Fragment>
  );
};

export default Comments;

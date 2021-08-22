import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { db } from '../../../../firebase';

const CommentsList = ({ postId }) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const unsubscribe = db
      .collection('posts')
      .doc(postId)
      .collection('comments')
      .orderBy('timestamp', 'desc')
      .onSnapshot(
        (snapshot) => {
          const fetchedComments = snapshot.docs.map((comment) => {
            return {
              ...comment.data(),
              id: comment.id,
            };
          });
          setComments(fetchedComments);
        },
        (error) => {
          console.log(error);
        },
        () => {
          console.log('Comments successfully fetched');
        }
      );

    return unsubscribe;
  }, [postId]);

  let content = <p>No comment found!</p>;

  if (comments.length > 0) {
    content = comments.map((comment) => (
      <div key={comment.id}>
        <Link
          to={`/user/${comment.userId}`}
          className="font-semibold text-md pr-2"
        >
          {comment.userName}
        </Link>
        <span>{comment.text}</span>
      </div>
    ));
  }

  return <div className="flex-grow">{content}</div>;
};

export default CommentsList;

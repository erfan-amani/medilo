import { nanoid } from '@reduxjs/toolkit';
import { useState } from 'react';
import { db, serverTimestamp } from '../../../../firebase';

const CommentForm = ({ postId, user }) => {
  const [enteredComment, setEnteredComment] = useState('');

  const commentChangeHandler = (event) => {
    setEnteredComment(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const newComment = {
      text: enteredComment,
      userId: user.userId,
      userName: user.userName,
      timestamp: serverTimestamp(),
    };

    db.collection('posts')
      .doc(postId)
      .collection('comments')
      .doc(nanoid())
      .set(newComment)
      .then(() => {
        console.log('Comment successfully sent!');
        setEnteredComment('');
      })
      .catch((error) => {
        console.error('Error sending comment: ', error);
      });
  };

  return (
    <form className="flex border-t-2 items-center" onSubmit={submitHandler}>
      <input
        type="text"
        placeholder="Add a comment..."
        value={enteredComment}
        onChange={commentChangeHandler}
        className="flex-grow focus:outline-none pr-2"
      />
      <button
        type="submit"
        disabled={enteredComment === ''}
        className="text-blue-700 disabled:cursor-not-allowed p-2"
      >
        post
      </button>
    </form>
  );
};

export default CommentForm;

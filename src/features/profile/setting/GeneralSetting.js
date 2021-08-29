import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { deleteAccount, signout } from '../../auth/auth-slice';

const GeneralSetting = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const signOutHandler = () => {
    dispatch(signout());
    history.push('/posts');
  };

  const deleteAccountHandler = () => {
    dispatch(deleteAccount());
    history.push('/posts');
  };

  return (
    <div className="flex flex-col gap-8 items-start">
      <h2 className="font-bold text-xl text-800">General Setting</h2>
      <div className="flex gap-4">
        <button
          type="button"
          onClick={signOutHandler}
          className="py-1.5 px-4 font-semibold bg-blue-500 text-white rounded-lg"
        >
          Sign Out
        </button>
        <button
          type="button"
          onClick={deleteAccountHandler}
          className="py-1.5 px-4 font-semibold bg-red-500 text-white rounded-lg"
        >
          Delete my account
        </button>
      </div>
    </div>
  );
};

export default GeneralSetting;

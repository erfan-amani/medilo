import { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import HomeIcon from '../Ui/Icons/nav/HomeIcon';
import PlusIcon from '../Ui/Icons/nav/PlusIcon';
import SearchIcon from '../Ui/Icons/nav/SearchIcon';
import ProfileButton from '../Ui/ProfileButton';

const Nav = () => {
  const user = useSelector((state) => state.auth.user);

  return (
    <div className="flex justify-between items-center py-2 px-12 text-gray-900 border-t-2 border-gray-300 md:gap-4 md:justify-start md:border-t-0 md:border-b-2">
      {/* 1) user not signed in */}
      {/* 2) user signed in */}
      {!user ? (
        <Fragment>
          <Link to="/posts" className="font-bold text-2xl flex-grow">
            Medilo
          </Link>
          <Link
            to="/signin"
            className="text-white bg-blue-600 px-3 py-1 rounded-md"
          >
            Sign in
          </Link>
        </Fragment>
      ) : (
        <Fragment>
          <span className="flex-grow hidden md:block">
            <Link
              to="/posts"
              className="w-max text-gray-800 font-bold text-2xl"
            >
              Medilo
            </Link>
          </span>
          <NavLink to="/posts" className="md:hidden">
            <HomeIcon className="w-6" />
          </NavLink>
          <NavLink to="/search" className="p-2">
            <SearchIcon className="w-6" />
          </NavLink>
          <NavLink to="/new">
            <PlusIcon className="w-6" />
          </NavLink>
          <NavLink to="/profile">
            <ProfileButton photoURL={user.photoURL} />
          </NavLink>
        </Fragment>
      )}
    </div>
  );
};

export default Nav;

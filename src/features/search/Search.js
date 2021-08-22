import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import PostListSmall from '../Ui/posts/PostListSmall';
import SearchIcon from '../Ui/Icons/nav/SearchIcon';

const Search = () => {
  const allPosts = useSelector((state) => state.posts.items);
  const [filteredPosts, setFilteredPosts] = useState(allPosts);
  const [searchTerm, setSearchTerm] = useState('');

  const searchTermChangeHandler = (event) => {
    setSearchTerm(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();
  };

  useEffect(() => {
    const timerId = setTimeout(() => {
      const term = searchTerm.toLocaleLowerCase();

      const filtered = allPosts.filter(
        (post) =>
          post.caption.toLowerCase().includes(term) ||
          post.userName.toLowerCase().includes(term)
      );

      setFilteredPosts(filtered);
    }, 1500);

    return () => clearTimeout(timerId);
  }, [searchTerm, allPosts]);

  return (
    <div className="w-full h-full bg-gray-200 md:py-8 mb-4">
      <div className="flex flex-col h-full md:h-auto md:gap-8 m-auto bg-white w-full md:w-2/3 xl:w-1/2 md:p-4 md:p-8 text-gray-800 shadow-md">
        <form
          onSubmit={submitHandler}
          className="flex items-center w-full border-b-2 active:border-gray-500 p-3 pb-4"
        >
          <input
            id="search"
            type="text"
            onChange={searchTermChangeHandler}
            value={searchTerm}
            placeholder="Search..."
            className="w-full focus:outline-none"
          />
          <label htmlFor="search">
            <SearchIcon className="w-5" strokeWidth="1.8" stroke="#555" />
          </label>
        </form>
        <PostListSmall posts={filteredPosts} />
      </div>
    </div>
  );
};

export default Search;

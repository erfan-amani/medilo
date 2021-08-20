import Nav from '../layout/Nav';
import PostsList from './PostsList';

const Posts = () => {
  console.log('here');
  return (
    <div className="relative h-full w-full bg-white overflow-x-hidden">
      <Nav />
      <div
        className="flex-grow w-max mx-auto"
        style={{ paddingBottom: '58px' }}
      >
        <PostsList />
      </div>
    </div>
  );
};

export default Posts;

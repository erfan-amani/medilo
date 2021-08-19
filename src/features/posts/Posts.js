import Nav from '../layout/Nav';

const Posts = () => {
  console.log('here');
  return (
    <div className="flex flex-col-reverse h-full w-full bg-white md:flex-col">
      <Nav />
      <div className="flex-grow">posts</div>
    </div>
  );
};

export default Posts;

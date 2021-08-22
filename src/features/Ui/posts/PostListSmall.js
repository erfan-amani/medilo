import PostItemSmall from './PostItemSmall';

const PostListSmall = ({ posts }) => {
  return (
    <div className="grid grid-cols-3 lg:grid-cols-4 pb-14 md:pb-0">
      {posts.map((post) => (
        <PostItemSmall key={post.id} image={post.image} />
      ))}
    </div>
  );
};

export default PostListSmall;

import PostItemSmall from './PostItemSmall';

const PostListSmall = ({ posts }) => {
  let content = (
    <p className="w-full text-center text-lg text-gray-800">No post found 🤨</p>
  );

  if (posts && posts.length > 0) {
    content = (
      <div className="grid grid-cols-3 lg:grid-cols-4 pb-14 md:pb-0">
        {posts.map((post) => (
          <PostItemSmall key={post.id} image={post.image} />
        ))}
      </div>
    );
  }

  return content;
};

export default PostListSmall;

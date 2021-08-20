import PostItem from './PostItem';

const data = [
  {
    id: 'post1',
    userName: 'ali',
    photoURL:
      'https://firebasestorage.googleapis.com/v0/b/medilo.appspot.com/o/default-avatar.jpg?alt=media&token=55dfeb5a-6842-418c-9592-6efee7ee52bc',
    image:
      'https://firebasestorage.googleapis.com/v0/b/medilo.appspot.com/o/test1.jpg?alt=media&token=bdf373c1-10b0-4a93-b63a-47c1092ba14d',
    caption: 'blah blah blah',
  },
  {
    id: 'post2',
    userName: 'erfan',
    photoURL:
      'https://firebasestorage.googleapis.com/v0/b/medilo.appspot.com/o/default-avatar.jpg?alt=media&token=55dfeb5a-6842-418c-9592-6efee7ee52bc',
    image:
      'https://firebasestorage.googleapis.com/v0/b/medilo.appspot.com/o/test2.jpeg?alt=media&token=186da2ee-cfda-4dbe-b7dd-cb0abeb2461a',
    caption: 'caption of me for this image',
  },
  {
    id: 'post3',
    userName: 'erfan',
    photoURL:
      'https://firebasestorage.googleapis.com/v0/b/medilo.appspot.com/o/default-avatar.jpg?alt=media&token=55dfeb5a-6842-418c-9592-6efee7ee52bc',
    image:
      'https://firebasestorage.googleapis.com/v0/b/medilo.appspot.com/o/test2.jpeg?alt=media&token=186da2ee-cfda-4dbe-b7dd-cb0abeb2461a',
    caption: 'caption of me for this image',
  },
  {
    id: 'post4',
    userName: 'ali',
    photoURL:
      'https://firebasestorage.googleapis.com/v0/b/medilo.appspot.com/o/default-avatar.jpg?alt=media&token=55dfeb5a-6842-418c-9592-6efee7ee52bc',
    image:
      'https://firebasestorage.googleapis.com/v0/b/medilo.appspot.com/o/test1.jpg?alt=media&token=bdf373c1-10b0-4a93-b63a-47c1092ba14d',
    caption: 'blah blah blah',
  },
  {
    id: 'post5',
    userName: 'erfan',
    photoURL:
      'https://firebasestorage.googleapis.com/v0/b/medilo.appspot.com/o/default-avatar.jpg?alt=media&token=55dfeb5a-6842-418c-9592-6efee7ee52bc',
    image:
      'https://firebasestorage.googleapis.com/v0/b/medilo.appspot.com/o/test2.jpeg?alt=media&token=186da2ee-cfda-4dbe-b7dd-cb0abeb2461a',
    caption: 'caption of me for this image',
  },
  {
    id: 'post6',
    userName: 'erfan',
    photoURL:
      'https://firebasestorage.googleapis.com/v0/b/medilo.appspot.com/o/default-avatar.jpg?alt=media&token=55dfeb5a-6842-418c-9592-6efee7ee52bc',
    image:
      'https://firebasestorage.googleapis.com/v0/b/medilo.appspot.com/o/test2.jpeg?alt=media&token=186da2ee-cfda-4dbe-b7dd-cb0abeb2461a',
    caption: 'caption of me for this image',
  },
];

const PostsList = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 justify-items-center min-h-full py-8 gap-8 overflow-x-hidden">
      {data.map((p) => (
        <PostItem key={p.id} {...p} />
      ))}
    </div>
  );
};

export default PostsList;

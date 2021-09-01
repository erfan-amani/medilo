import { useEffect, useState } from 'react';
import { Form, Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';

import LoadingSpinner from '../../Ui/LoadingSpinner';
import { storage, db, serverTimestamp } from '../../../firebase';
import { addPost } from '../posts-slice';
import FileField from '../../Ui/FormFields/FileField';
import TextAreaField from '../../Ui/FormFields/TextAreaField';
import { useHistory } from 'react-router-dom';

const SUPPORTED_SIZE = 1024 * 2024;
const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/gif', 'image/png'];

const validationSchema = Yup.object({
  caption: Yup.string()
    .min(5, 'At least five characters.')
    .required('Required!'),
  image: Yup.mixed()
    .required('Image is required')
    .test(
      'fileSize',
      'File is too large. Maximum 2MB',
      (value) => value?.size <= SUPPORTED_SIZE
    )
    .test('fileFormat', 'Unsupported Format', (value) =>
      SUPPORTED_FORMATS.includes(value?.type)
    ),
});

const NewPost = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const history = useHistory();
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const submitHandler = (values, { resetForm }) => {
    setLoading(true);
    const storageRef = storage.ref();
    const uploadTask = storageRef.child(values.image.name).put(values.image);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progress);
        console.log(`Uploading ${progress}%`);
      },
      (error) => {
        console.log(error);
        setError(error);
        setLoading(false);
      },
      () => {
        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
          // setProgress(0);
          // send to db and add to store
          const postData = {
            caption: values.caption,
            image: downloadURL,
            userId: user.userId,
          };
          db.collection('posts')
            .add({ ...postData, timestamp: serverTimestamp() })
            .then((postRef) => {
              postData.id = postRef.id;
              dispatch(addPost(postData));
              resetForm();
              setLoading(false);
            })
            .catch((error) => {
              console.log(error);
              setError(error);
              setLoading(false);
            });
        });
      }
    );
  };

  useEffect(() => {
    if (!loading && progress === 100) {
      setTimeout(() => {
        history.replace('/posts');
      }, 500);
    }
  }, [loading, progress, history]);

  return (
    <div className="flex bg-white-300" style={{ height: 'calc(100vh - 58px)' }}>
      <div className="flex flex-col items-center m-auto bg-white gap-4 w-11/12 sm:w-3/5 md:w-1/2 xl:w-1/3 rounded-sm">
        <h2 className="font-bold text-xl md:text-2xl text-gray-800 mb-2">
          New Post
        </h2>
        <Formik
          validationSchema={validationSchema}
          onSubmit={submitHandler}
          initialValues={{ caption: '', image: undefined }}
        >
          <Form>
            <fieldset disabled={loading} className="space-y-4">
              <TextAreaField label="Caption" name="caption" />
              <FileField
                label="Choose an image"
                name="image"
                type="file"
                uploadProgress={progress}
              />
              {loading ? (
                <LoadingSpinner />
              ) : (
                <button
                  type="submit"
                  className="w-full py-2 text-white bg-indigo-600 rounded-sm font-semibold"
                >
                  Post
                </button>
              )}
            </fieldset>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default NewPost;

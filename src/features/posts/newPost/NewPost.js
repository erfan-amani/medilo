import { Fragment, useState } from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';

import Card from '../../Ui/Card';
import LoadingSpinner from '../../Ui/LoadingSpinner';
import { storage, db, serverTimestamp } from '../../../firebase';
import { addPost } from '../posts-slice';

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
      'File too large',
      (value) => value?.size <= SUPPORTED_SIZE
    )
    .test('fileFormat', 'Unsupported Format', (value) =>
      SUPPORTED_FORMATS.includes(value?.type)
    ),
});

const NewPost = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const submitHandler = (values) => {
    setLoading(true);

    const storageRef = storage.ref();
    const uploadTask = storageRef.child(values.image.name).put(values.image);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progress);
        console.log(progress);
      },
      (error) => {
        console.log(error);
        setError(error);
        setLoading(false);
      },
      () => {
        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
          setProgress(0);

          // send to db and add to store
          const postData = {
            caption: values.caption,
            image: downloadURL,
            userName: user.userName,
            userProfile: user.photoURL,
            userId: user.uid,
          };

          db.collection('posts')
            .add({ ...postData, timestamp: serverTimestamp() })
            .then((postRef) => {
              postData.id = postRef.id;

              dispatch(addPost(postData));
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

  const imageChangeHandler = (event, setFieldValue) => {
    setFieldValue('image', event.currentTarget.files[0]);
  };

  return (
    <div
      className="flex items-center justify-center bg-gray-300"
      style={{ height: 'calc(100% - 58px)' }}
    >
      <Card>
        <h2 className="font-bold text-xl md:text-2xl text-gray-800 mb-6">
          New Post
        </h2>
        <Formik
          validationSchema={validationSchema}
          onSubmit={submitHandler}
          initialValues={{ caption: '', image: undefined }}
        >
          {(formik) => {
            return (
              <Fragment>
                {error && (
                  <p className="bg-red-100 text-red-600 border-2 border-red-400 py-2 px-4">
                    {error}
                  </p>
                )}
                <Form className="w-full space-y-6 text-gray-800">
                  <div className="flex flex-col">
                    <label htmlFor="caption" className="block mb-2">
                      Caption
                    </label>
                    <Field
                      name="caption"
                      id="caption"
                      as="textarea"
                      label="Caption"
                      rows="5"
                      className="border-2 focus:outline-none px-2 py-1"
                    ></Field>
                    <ErrorMessage
                      name="caption"
                      render={(msg) => (
                        <p className="text-sm text-red-500">{msg}</p>
                      )}
                    />
                  </div>
                  <div>
                    <label htmlFor="image" className="block mb-2">
                      Choose post image
                    </label>
                    <input
                      id="image"
                      type="file"
                      accept="image/jpg, image/jpeg, image/gif, image/png"
                      onChange={(e) =>
                        imageChangeHandler(e, formik.setFieldValue)
                      }
                    />
                    {formik.errors.image && formik.touched.image && (
                      <p className="text-sm text-red-500">
                        {formik.errors.image}
                      </p>
                    )}
                    <div className="bg-indigo-200 rounded-full h-4 mt-4">
                      <div
                        className="bg-green-600 h-full rounded-full"
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                  </div>
                  {loading ? (
                    <LoadingSpinner />
                  ) : (
                    <button
                      type="submit"
                      className="w-full py-2 text-white bg-indigo-600 rounded-sm font-medium"
                    >
                      Send
                    </button>
                  )}
                </Form>
              </Fragment>
            );
          }}
        </Formik>
      </Card>
    </div>
  );
};

export default NewPost;

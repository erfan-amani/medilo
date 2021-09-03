import { Form, Formik } from 'formik';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { storage } from '../../../firebase';
import FileField from '../../Ui/FormFields/FileField';
import LoadingSpinner from '../../Ui/LoadingSpinner';
import { updateProfilePhoto } from '../../users/user-slice';

const SUPPORTED_SIZE = 2024 * 2024;
const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/gif', 'image/png'];

const validationSchema = Yup.object({
  image: Yup.mixed()
    .required('Image is required')
    .test(
      'fileSize',
      'File is too large. Maximum 4MB',
      (value) => value?.size <= SUPPORTED_SIZE
    )
    .test('fileFormat', 'Unsupported Format', (value) =>
      SUPPORTED_FORMATS.includes(value?.type)
    ),
});

const ChangeProfilePhoto = () => {
  const dispatch = useDispatch();
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);

  const submitHandler = (values) => {
    setLoading(true);
    const storageRef = storage.ref();
    const uploadTask = storageRef.child(values.image.name).put(values.image);
    uploadTask.on(
      'state_change',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(`Uploading ${progress}%`);
        setProgress(progress);
      },
      (error) => {
        console.log(error);
        setLoading(false);
      },
      () => {
        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
          dispatch(updateProfilePhoto(downloadURL));
        });
        setLoading(false);
      }
    );
  };

  return (
    <div className="flex flex-col gap-8 items-start">
      <h1 className="font-bold text-xl text-800">Change profile photo</h1>
      <Formik
        initialValues={{ image: undefined }}
        validationSchema={validationSchema}
        onSubmit={submitHandler}
      >
        <Form className="flex flex-col gap-4">
          <FileField
            label="Upload image"
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
              Submit
            </button>
          )}
        </Form>
      </Formik>
    </div>
  );
};

export default ChangeProfilePhoto;

import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import FileField from '../../Ui/FormFields/FileField';

const SUPPORTED_SIZE = 1024 * 2024;
const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/gif', 'image/png'];

const validationSchema = Yup.object({
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

const submitHandler = (values) => {
  console.log(values);
};

const ChangeProfilePhoto = () => {
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
            uploadProgress={0}
          />
          <button
            type="submit"
            className="w-full py-2 text-white bg-indigo-600 rounded-sm font-semibold"
          >
            Submit
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default ChangeProfilePhoto;

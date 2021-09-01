import { Formik, Form } from 'formik';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import TextField from '../../Ui/FormFields/TextField';
import { updateUsername } from '../../users/user-slice';

const validationSchema = Yup.object({
  username: Yup.string().min(5, 'At least 5 characters!').required('Required!'),
});

const ChangeUserName = () => {
  const dispatch = useDispatch();

  const submitHandler = (values) => {
    dispatch(updateUsername(values.username));
  };

  return (
    <div className="flex flex-col gap-8 items-start">
      <h1 className="font-bold text-xl text-800">Change username</h1>
      <Formik
        initialValues={{ username: '' }}
        validationSchema={validationSchema}
        onSubmit={submitHandler}
      >
        <Form>
          <TextField label="Username" name="username" type="text" />
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

export default ChangeUserName;

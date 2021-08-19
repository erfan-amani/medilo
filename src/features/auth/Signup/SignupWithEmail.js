import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import TextField from '../../Ui/TextField';
import FormikStepper from './FormikStepper';

const schemas = [
  {
    email: Yup.string().email('Email is invalid').required('Required!'),
    password: Yup.string()
      .min(6, 'Must be at least 6 characters!')
      .required('Password required!'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Must be match to password')
      .required('Confirm password require!'),
  },
  {
    userName: Yup.string()
      .max(15, 'Must be less than 15 characters!')
      .required('User name is require!'),
  },
];

const SigninWithEmail = () => {
  const initialValues = {
    email: '',
    password: '',
    confirmPassword: '',
    userName: '',
    photo: null,
  };

  const submitHandler = (values, { setSubmitting }) => {
    console.log(values);
    setSubmitting(true);
  };

  return (
    <Fragment>
      <h2 className="text-xl md:text-3xl font-bold mb-8">Sign up with Email</h2>
      <FormikStepper
        initialValues={initialValues}
        schemas={schemas}
        onSubmit={submitHandler}
        steps={[
          // Step 1 : email & password
          <Fragment>
            <TextField name="email" type="email" label="Email" />
            <TextField name="password" type="password" label="Password" />
            <TextField
              name="confirmPassword"
              type="password"
              label="Confirm password"
            />
          </Fragment>,
          // Step 2 : username & profile photo
          (setFieldValue) => {
            return (
              <Fragment>
                <TextField name="userName" type="text" label="User Name" />
                <div className="flex flex-col">
                  <label htmlFor="photo">Profile photo (optional)</label>
                  <input
                    id="photo"
                    name="photo"
                    type="file"
                    accept="image/png, image/jpeg, image/svg"
                    onChange={(event) => {
                      setFieldValue('photo', event.currentTarget.files[0]);
                    }}
                    className="border-2 p-2"
                  />
                </div>
              </Fragment>
            );
          },
        ]}
      />
      <Link to="/signup" className="text-gray-700 underline">
        All sign up options
      </Link>
    </Fragment>
  );
};

export default SigninWithEmail;

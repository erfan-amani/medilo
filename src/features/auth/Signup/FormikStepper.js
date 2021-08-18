import React, { useState } from 'react';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';

const FormikStepper = ({
  schemas,
  steps: stepsArray,
  initialValues,
  onSubmit,
}) => {
  const [step, setStep] = useState(0);

  const currentStep = stepsArray[step];
  const currentSchema = schemas[step];
  const isLastStep = step === stepsArray.length - 1;

  const backHandler = () => {
    setStep((prev) => prev - 1);
  };

  const submitOrNextHandler = async (values, helpers) => {
    if (isLastStep) {
      await onSubmit(values, helpers);
    } else {
      setStep((prev) => prev + 1);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={submitOrNextHandler}
      validationSchema={Yup.object(currentSchema)}
    >
      {(formik) => (
        <Form className="w-full space-y-4">
          {/* The current step could be a function that gets the formik.setFieldValue for times that we need to update state manually like file input and also could be JSX  */}
          {typeof currentStep === 'function'
            ? currentStep(formik.setFieldValue)
            : currentStep}
          {step > 0 && (
            <button
              type="button"
              onClick={backHandler}
              className="mr-1 bg-indigo-600 px-4 py-2 text-white rounded-full"
            >
              Back
            </button>
          )}
          <button
            type="submit"
            className="bg-indigo-600 px-4 py-2 text-white rounded-full"
          >
            {isLastStep ? 'Sign up' : 'Next'}
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default FormikStepper;

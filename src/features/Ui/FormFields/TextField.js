import { useField } from 'formik';
import React from 'react';

const TextField = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <div className="flex flex-col w-full text-gray-800 mb-2">
      <div className="w-full">
        <label htmlFor={field.name}>{label}</label>
        <input
          {...props}
          {...field}
          className="w-full py-1 px-2 border-2 border-purple-400 focus:border-purple-600 focus:outline-none rounded-md"
        />
        {meta.error && meta.touched && (
          <p className="text-sm text-red-500">{meta.error}</p>
        )}
      </div>
    </div>
  );
};

export default TextField;

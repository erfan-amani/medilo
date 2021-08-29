import { useField } from 'formik';
import React, { useState } from 'react';
import UploadIcon from '../Icons/UploadIcon';

const FileField = ({ label, uploadProgress, ...props }) => {
  const [src, setSrc] = useState('');
  const [field, meta, helper] = useField(props.name);

  const changeInputHandler = (event) => {
    const file = event.currentTarget.files[0];
    helper.setTouched(true);

    if (!file) return;

    helper.setValue(file);
    if (file) setSrc(URL.createObjectURL(file));
    else setSrc(null);
  };

  return (
    <div className="flex flex-col items-center w-full">
      <input
        name={field.name}
        onBlur={field.onBlur}
        onChange={changeInputHandler}
        {...props}
        id="file"
        hidden
      />
      <label
        htmlFor="file"
        className="block max-w-full flex flex-col w-60 md:w-72 cursor-pointer"
      >
        {/* LABEL */}
        {label}
        {/* BOX OF FILE */}
        <div className="flex flex-col bg-purple-200 rounded-xl border-3 border-purple-500 border-dashed overflow-hidden w-full">
          {/* ICON OR PREVIEW OF IMAGE */}
          <div className="flex-grow h-60 md:h-72 w-full overflow-hidden rounded-t-xl">
            {src ? (
              <img
                src={src}
                alt=""
                className="inline-block w-full h-full object-cover object-center"
              />
            ) : (
              <div className="flex w-full h-full items-center justify-center">
                <UploadIcon />
              </div>
            )}
          </div>
          {/* CHOOSE FILE BUTTON OR NAME OF SELECTED FILE */}
          <div className="relative flex-grow-0 w-full text-center bg-gray-100 rounded-b-xl py-1.5 font-semibold text-purple-700 border-t-2 border-purple-500">
            <div
              className="absolute top-0 left-0 bg-purple-600 h-full transition-width duration-300"
              style={{ width: `${uploadProgress}%` }}
            ></div>
            {field.value ? field.value.name : 'Choose a file'}
          </div>
        </div>
      </label>
      {meta.error && meta.touched && (
        <p className="self-start text-sm text-red-500">{meta.error}</p>
      )}
    </div>
  );
};

export default FileField;

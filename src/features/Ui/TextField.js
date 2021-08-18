import { useField } from 'formik';

const TextField = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <div>
      <div className="flex flex-col">
        <label>{label}</label>
        <input
          {...field}
          {...props}
          className="border-2 border-gray-300 rounded-sm focus:outline-none focus:border-gray-400 text-lg pl-2"
        />
      </div>
      {meta.error && meta.touched && (
        <p className="text-red-500 text-sm">{meta.error}</p>
      )}
    </div>
  );
};

export default TextField;

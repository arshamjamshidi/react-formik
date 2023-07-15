import React from "react";

import { useFormik } from "formik";
import * as Yup from "yup";

const initialValues = {
  name: "",
  phone: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const onSubmit = (values, { resetForm }) => {
  const formData = values;
  console.log(formData);
  resetForm();

  // post data to your back-end
};

const validationSchema = Yup.object({
  name: Yup.string().required("Name is required").min(3),
  phone: Yup.string().required("Phone number is required"),
  email: Yup.string().email().required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
      "Min 8 ch, 1 ucl, 1 lcl, 1 n"
    ),
  confirmPassword: Yup.string()
    .required("Confirm password is required")
    .oneOf([Yup.ref("password"), null], "Confirm password must be match"),
});

const labels = {
  name: "Name",
  phone: "Phone",
  email: "Email",
  password: "Password",
  confirmPassword: "Confirm password",
};

const Form = () => {
  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
    validateOnMount: true,
  });

  const { handleSubmit, getFieldProps, values, errors, touched, isValid } =
    formik;

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-white rounded-3xl py-5 px-6 w-96">
        <div className="mb-8 text-center font-black text-xl">
          <h1>Sign Up Formik</h1>
        </div>

        <form onSubmit={handleSubmit}>
          {Object.keys(values).map((key, i) => (
            <div key={i} className="mb-8 relative font-bold text-slate-700">
              <div className="flex justify-between items-center">
                <label htmlFor={key} className="ml-0.5">
                  {labels[key]}
                </label>
                {errors[key] && touched[key] && (
                  <span className="text-xs text-red-500">{errors[key]}</span>
                )}
              </div>
              <input
                type="text"
                {...getFieldProps(key)} // ? => value, onChange, onBlur
                name={key}
                id={key}
                className="w-full p-2 text-sm rounded-md bg-gray-200"
              />
            </div>
          ))}

          <div className="mt-8 flex justify-center">
            <button
              disabled={!isValid}
              type="submit"
              className={`bg-blue-600 text-white font-bold p-2 rounded-lg w-1/2 transition-all duration-300 ${
                !isValid ? "opacity-50" : "hover:bg-blue-800"
              }`}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;

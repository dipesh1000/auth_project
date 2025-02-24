import { Button, Checkbox, Label, TextInput } from 'flowbite-react';
import { CustomCheckbox, CustomInput } from '../../components';
import { PiCashRegisterThin } from 'react-icons/pi';
import useCustomForm from '../../hooks/useCustomForm';
import axiosInstance from '../../utils/AxiosInstance';
import * as Yup from 'yup';
import toast, { Toaster } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router';

export default function Register() {
  const navigate = useNavigate();
  const initialValues = {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  };
  const onSubmit = async (values) => {
    const response = await axiosInstance.post('/auth/register', values);

    if (response.status === 201) {
      toast.success('Successfully Registered');
      navigate('/login');
    }
  };
  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Required'),
    password: Yup.string()
      .min(6, 'Must be 6 characters or more')
      .required('Required'),
    confirmPassword: Yup.string().oneOf(
      [Yup.ref('password'), null],
      'Passwords must match'
    ),
  });
  const { formik } = useCustomForm(initialValues, onSubmit, validationSchema);

  return (
    <>
      <div className="flex flex-col items-center gap-4">
        <PiCashRegisterThin className="text-5xl" />
        <h1 className="text-2xl font-bold mb-5">Register</h1>
      </div>
      <form
        className="flex max-w-md flex-col gap-4"
        onSubmit={formik.handleSubmit}
      >
        <div>
          <CustomInput
            name="username"
            label="Username"
            onChange={formik.handleChange}
            type="text"
            placeholder="johnst"
            errors={formik.errors.username}
          />
        </div>
        <div>
          <CustomInput
            name="email"
            label="Email"
            type="email"
            onChange={formik.handleChange}
            errors={formik.errors.email}
            placeholder="example@gmail.com"
          />
        </div>
        <div>
          <CustomInput
            name="password"
            placeholder="password"
            onChange={formik.handleChange}
            errors={formik.errors.password}
            type="password"
            label="Password"
          />
        </div>
        <div>
          <CustomInput
            name="confirmPassword"
            placeholder="password"
            onChange={formik.handleChange}
            type="password"
            errors={formik.errors.confirmPassword}
            label="Confirm Password"
          />
        </div>
        <CustomCheckbox label="Terms and Condition" />
        <Button type="submit">Submit</Button>
      </form>
      <div className="text-center pt-5">
        <span>
          Already have account ?
          <Link to="/login" className="text-cyan-700 ml-2">
            Sign In
          </Link>
        </span>
      </div>
    </>
  );
}

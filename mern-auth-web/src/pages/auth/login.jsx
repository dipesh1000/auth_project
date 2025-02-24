import { Button, Checkbox, Label, TextInput } from 'flowbite-react';
import { CustomCheckbox, CustomInput } from '../../components';
import { SiFusionauth } from 'react-icons/si';
import useCustomForm from '../../hooks/useCustomForm';
import * as Yup from 'yup';
import { useState } from 'react';
import useApi from '../../hooks/useApi';
import axiosInstance from '../../utils/AxiosInstance';
import { useAuth } from '../../hooks/useAuth';
import { Link, useNavigate } from 'react-router';

export default function Login() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { login } = useAuth();

  const initialValues = { email: '', password: '' };
  const onSubmit = async (values) => {
    const response = await axiosInstance.post('/auth/login', values);
    login(response);
    if (response.status === 200) {
      navigate('/');
    }
  };
  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Required'),
    password: Yup.string()
      .min(6, 'Must be 6 characters or more')
      .required('Required'),
  });
  const { formik } = useCustomForm(initialValues, onSubmit, validationSchema);

  return (
    <>
      <div className="flex flex-col items-center gap-4">
        <SiFusionauth className="text-5xl" />
        <h1 className="text-2xl font-bold mb-10">Login</h1>
      </div>
      <form
        onSubmit={formik.handleSubmit}
        className="flex max-w-md flex-col gap-4 "
      >
        <div>
          <CustomInput
            name="email"
            label="Your Email"
            type="email"
            onChange={formik.handleChange}
            placeholder="example@gmail.com"
            className="w-full m-width-full"
          />
        </div>
        <div>
          <CustomInput
            name="password"
            placeholder="pa$$word"
            type="password"
            onChange={formik.handleChange}
            label="Password"
          />
        </div>
        <div className="flex justify-between">
          <CustomCheckbox />{' '}
          <Link to="/forget-password" className="text-cyan-700 text-sm">
            Forget Password
          </Link>
        </div>

        <Button type="submit">Submit</Button>
      </form>
      <div className="text-center pt-5">
        <span>
          You don't have account ?{' '}
          <Link to="/register" className="text-cyan-700">
            Sign up
          </Link>
        </span>
      </div>
    </>
  );
}

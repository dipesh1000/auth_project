import { Button, Checkbox, Label, TextInput } from 'flowbite-react';
import { CustomCheckbox, CustomInput } from '../../components';
import { SiFusionauth } from 'react-icons/si';
import useCustomForm from '../../hooks/useCustomForm';
import { useNavigate } from 'react-router';
import axiosInstance from '../../utils/AxiosInstance';
import * as Yup from 'yup';

export default function ResetPassword() {
  const navigate = useNavigate();
  const initialValues = {
    token: '',
    password: '',
    confirmPassword: '',
  };
  const onSubmit = async (values) => {
    const response = await axiosInstance.post('/auth/register', values);
    return response;
  };
  const validationSchema = Yup.object({
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
        <SiFusionauth className="text-5xl" />
        <h1 className="text-2xl font-bold mb-10">Reset Password</h1>
      </div>
      <form
        className="flex max-w-md flex-col gap-4 "
        onSubmit={formik.handleSubmit}
      >
        <div>
          <CustomInput
            onChange={formik.handleChange}
            name="password"
            placeholder="example##!"
            type="password"
            label="New Password"
          />
        </div>
        <div>
          <CustomInput
            name="password"
            placeholder="example##!"
            onChange={formik.handleChange}
            type="password"
            label="Repeat Password"
          />
        </div>

        <Button type="submit">Reset</Button>
      </form>
    </>
  );
}

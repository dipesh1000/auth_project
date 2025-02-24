import { Button, Checkbox, Label, TextInput } from 'flowbite-react';
import { CustomCheckbox, CustomInput } from '../../components';
import { SiFusionauth } from 'react-icons/si';
import { useNavigate } from 'react-router';
import useCustomForm from '../../hooks/useCustomForm';
import axiosInstance from '../../utils/AxiosInstance';
import * as Yup from 'yup';

export default function ForgetPassword() {
  const navigate = useNavigate();

  const initialValues = { email: '' };
  const onSubmit = async (values) => {
    const response = await axiosInstance.get(
      `/auth/forget-password/${values.email}`
    );
    if (response.status === 200) {
      navigate('/');
    }
    return response;
  };
  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Required'),
  });
  const { formik } = useCustomForm(initialValues, onSubmit, validationSchema);
  console.log(formik, 'from the formik values');
  return (
    <>
      <div className="flex flex-col items-center gap-4">
        <SiFusionauth className="text-5xl" />
        <h1 className="text-2xl font-bold mb-10">Forget Password</h1>
      </div>
      <form
        className="flex max-w-md flex-col gap-4"
        onSubmit={formik.handleSubmit}
      >
        <div>
          <CustomInput
            name="email"
            label="Your Email"
            type="email"
            onChange={formik.handleChange}
            placeholder="your email"
            className="w-full m-width-full"
            errors={formik.errors.email}
          />
        </div>

        <Button type="submit">Submit</Button>
      </form>
    </>
  );
}

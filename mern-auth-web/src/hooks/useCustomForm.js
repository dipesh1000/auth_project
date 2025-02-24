import { useFormik } from 'formik';
import { toast } from 'react-hot-toast';

const useCustomForm = (initialValues, onSubmit, validationSchema) => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        const data = await onSubmit(values, { setErrors });
        Boolean(data?.data?.message) && toast.success(data?.data?.message);
      } catch (error) {
        if (error.response && error.response.data) {
          toast.error(error?.response?.data?.message);
          setErrors({ server: error.response.data.message });
        } else {
          setErrors({ server: 'An error occurred. Please try again.' });
        }
      } finally {
        setSubmitting(false);
      }
    },
  });

  return { formik };
};

export default useCustomForm;

import { Label, TextInput } from 'flowbite-react';
import React from 'react';

const CustomInput = ({ label, errors, placeholder, name, ...rest }) => {
  return (
    <>
      <div className="mb-2 block">
        <Label htmlFor={name} value={label} />
      </div>
      <TextInput
        id={name}
        type="text"
        placeholder={placeholder}
        name={name}
        required
        color={errors ? 'failure' : ''}
        helperText={
          errors ? (
            <>
              <span className="font-medium">Oops!</span> {errors}
            </>
          ) : null
        }
        {...rest}
      />
    </>
  );
};

export default CustomInput;

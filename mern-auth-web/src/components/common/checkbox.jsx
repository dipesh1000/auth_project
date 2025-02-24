import { Checkbox, Label } from 'flowbite-react';
import React from 'react';

const CustomCheckbox = ({ label }) => {
  return (
    <>
      <div className="flex items-center gap-2">
        <Checkbox id="remember" />
        <Label htmlFor="remember">{label ?? 'Remember me'}</Label>
      </div>
    </>
  );
};

export default CustomCheckbox;

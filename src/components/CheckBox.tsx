import { ChangeEventHandler } from 'react';

interface CheckBoxProps {
  id: string;
  name: string;
  label: string;
  checked?: boolean;
  onChangeHandler?: ChangeEventHandler<HTMLInputElement>;
}

const CheckBox = ({ id, name, label, checked, onChangeHandler }: CheckBoxProps) => {

  return (
    <>
      <label
        className="checkbox-label"
        htmlFor={name}>{label}</label>
      <input
        className="checkbox-input"
        type="checkbox"
        name={name}
        id={id}
        {...(checked ? { checked } : {})}
        {...(onChangeHandler ? { onChange: onChangeHandler } : {})}
      />
    </>
  );
};

export default CheckBox;

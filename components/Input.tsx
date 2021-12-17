import type {
  FieldValues,
  Path,
  FieldErrors,
  Control,
  DeepPartial
} from "react-hook-form";
import style from "../styles/form.module.scss";
import { useWatch } from "react-hook-form";
import { useState, FocusEvent } from "react";

type IInput<T = FieldValues> = {
  name: Path<T>;
  errors: FieldErrors<T>;
  label: string;
  control: Control<T>;
};

const Input = <T,>({ name, label, errors, control }: IInput<T>) => {
  const data = control.register(name);
  const value = useWatch({ name, control });
  const [isFocus, setIsFocus] = useState(false);

  const handleFocus = () => {
    setIsFocus(true);
  };

  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    data.onBlur(e);
    setIsFocus(false);
  };

  return (
    <label className={style.field}>
      <span
        className={`${style["field-label"]} ${
          (!!value || isFocus) && style.hide
        }`}
      >
        {label}
      </span>
      <input {...data} onFocus={handleFocus} onBlur={handleBlur} />
      {/* FIXME Fix the tricky DeepMap index  */}
      {/*  @ts-ignore  */}
      <span className={style["error"]}>{errors[name as keyof T]?.message}</span>
    </label>
  );
};

export default Input;

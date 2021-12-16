import type { UseFormRegister, FieldValues, Path, FieldErrors } from 'react-hook-form'
import style from '../styles/form.module.scss'

type IInput<T = FieldValues> = {
    name: Path<T>
    register: UseFormRegister<T>
    errors: FieldErrors<T>
    label: string
}

const Input = <T,>({ register, name, label, errors }: IInput<T>) => {
    return (
        <label className={style.field}>
            <span className={style["field-label"]}>{label}</span>
            <input {...register(name)}/>
            <span className={style["error"]}>{errors[name]?.message}</span>
        </label>
    )
}

export default Input

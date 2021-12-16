import type { NextPage } from 'next'
import Head from 'next/head'
import Input from '../components/Input'
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import type { IFormData } from '../types/form'
import { push } from '../redux/form'
import { useAppDispatch } from '../store'
import { useRouter } from 'next/router';
import Link from 'next/link'
import styles from '../styles/form.module.scss'

const formSchema = yup.object({
  name: yup.string().required(),
  email: yup.string().required(),
})

const FormPage: NextPage = (props) => {
    const dispatch = useAppDispatch()
    
    const { register, handleSubmit, formState: { errors } } = useForm<IFormData>({
        resolver: yupResolver(formSchema)
    });

    const router = useRouter()

    const onSubmit: SubmitHandler<IFormData> = data => {
        dispatch(push(data))
        router.push("/results")
    }
    
  return (
      <>
          <Head>
              <title>Form | Nudge Digital</title>
              <meta name="description" content="This is the form page" />
          </Head>
      <div>
          <h1>Form</h1>
          <p>This is the form page. Fill up the information and it will be pushed to the <Link href="/results">result table</Link>
          </p>
          <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
              <Input register={register} name={"name"} label={"Name"} errors={errors}/>
              <Input register={register} name={"email"} label={"Email"} errors={errors}/>
              <button className={styles["submit-button"]} type="submit">Submit</button>
          </form>
      </div>
      </>
  )
}

export default FormPage

import type { NextPage } from "next";
import Head from "next/head";
import Input from "../components/Input";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import type { IFormData } from "../types/form";
import { push } from "../redux/form";
import { set } from "../redux/header";
import { useAppDispatch } from "../store";
import { useRouter } from "next/router";
import Link from "next/link";
import styles from "../styles/form.module.scss";
import { useEffect } from "react";

const formSchema = yup.object({
  name: yup.string().required(),
  email: yup.string().required(),
});

const FormPage: NextPage = (props) => {
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<IFormData>({
    resolver: yupResolver(formSchema),
  });

  const router = useRouter();

  const onSubmit: SubmitHandler<IFormData> = (data) => {
    dispatch(push(data));
    router.push("/results");
  };

  useEffect(() => {
    dispatch(
      set({
        title: "Form",
        description: "This is the form page.",
      })
    );
  }, [dispatch]);

  return (
    <>
      <Head>
        <title>Form | Nudge Digital</title>
        <meta name="description" content="This is the form page" />
      </Head>
      <div className={styles.container}>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <Input
            name={"name"}
            label={"Name"}
            errors={errors}
            control={control}
          />
          <Input
            name={"email"}
            label={"Email"}
            errors={errors}
            control={control}
          />
          <button className={styles["submit-button"]} type="submit">
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default FormPage;

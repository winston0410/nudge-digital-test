import type { NextPage } from "next";
import Head from "next/head";
import { useAppSelector, useAppDispatch } from "../store";
import { IFormData } from "../types/form";
import { set } from "../redux/header";
import style from "../styles/results.module.scss";
import { useEffect } from "react";

const tableSchema: IFormData = {
  name: "",
  email: "",
};

const TablePage: NextPage = () => {
  const results = useAppSelector((state) => state.form.data);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(
      set({
        title: "Results",
        description: "This is the results page.",
      })
    );
  }, [dispatch]);

  return (
    <>
      <Head>
        <title>Results | Nudge Digital</title>
        <meta name="description" content="This is the results page" />
      </Head>
      <div>
        {results.length > 0 ? (
          <table className={style["result-table"]}>
            <thead>
              <tr>
                {Object.keys(tableSchema).map((key: string) => (
                  <th className={style["result-header"]} key={key}>
                    {key}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {results.map((row) => (
                <tr key={row.name + row.email}>
                  <td className={style["result-col"]}>{row.name}</td>
                  <td className={style["result-col"]}>{row.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div>
            <span>No data can be found yet!</span>
          </div>
        )}
      </div>
    </>
  );
};

export default TablePage;

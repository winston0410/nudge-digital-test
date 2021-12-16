import type { NextPage } from "next";
import Head from "next/head";
import { useAppSelector } from "../store";
import { IFormData } from "../types/form";

const TablePage: NextPage = () => {
  const results = useAppSelector((state) => state.form.data);

  console.log("check result", results);

  return (
    <>
      <Head>
        <title>Results | Nudge Digital</title>
        <meta name="description" content="This is the results page" />
      </Head>
      <div>
        <h1>This is the result page</h1>
        <table>
          <thead>
            <tr>
                {results[0] && Object.keys(results[0]).map((key: string) => (
                    <th key={key}>
                        {key}
                    </th>
                ))}
            </tr>
          </thead>
          <tbody>
            {results.map(row => (
                <tr key={row.name + row.email}>
                    <td>{row.name}</td>
                    <td>{row.email}</td>
                </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default TablePage;

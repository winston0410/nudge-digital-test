import type { ReactNode } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

type ILayout = {
  children: ReactNode;
};

const pageList = [
  {
    name: "Form",
    href: "/",
  },
  {
    name: "Results",
    href: "/results",
  },
];

const Layout = ({ children }: ILayout) => {
  const { asPath } = useRouter();

  return (
    <>
      <header className="header"></header>
      <main>
        <nav>
          <ul role="list">
            {pageList.map((page) => (
              <li key={page.href}>
                {page.href === asPath ? (
                  <span aria-current="true">{page.name}</span>
                ) : (
                  <Link href={page.href}>{page.name}</Link>
                )}
              </li>
            ))}
          </ul>
        </nav>
        {children}
      </main>
    </>
  );
};

export default Layout;

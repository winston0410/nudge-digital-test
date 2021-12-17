import type { ReactNode } from "react";
import { useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useAppSelector } from "../store";
import style from "../styles/layout.module.scss";
import useResizeObserver from "@react-hook/resize-observer";

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
  const headerData = useAppSelector((state) => state.header);
  const header = useRef(null);
  const [headerHeight, setHeaderHeight] = useState(0);

  useResizeObserver(header, (entry) => {
    setHeaderHeight(entry.contentRect.height);
  });

  return (
    <div className={style["outer-container"]}>
      <header className={style.header} ref={header}>
        <h1>{headerData.title}</h1>
        <p>{headerData.description}</p>
      </header>
      <main
        style={{
          height: `calc(100vh - ${headerHeight}px)`,
        }}
      >
        <nav>
          <ul className={style["tab-list"]} role="list">
            {pageList.map((page) => (
              <li key={page.href}>
                {page.href === asPath ? (
                  <span className={style["active-tab"]} aria-current="true">
                    {page.name}
                  </span>
                ) : (
                  <Link href={page.href} passHref>
                    <span className={style.tab}>{page.name}</span>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>
        <div className={style.container}>{children}</div>
      </main>
    </div>
  );
};

export default Layout;

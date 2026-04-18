"use client";

import Link from "next/link";
import css from "./Header.module.css";
import { usePathname } from "next/navigation";

function Header() {
  const pathname = usePathname();

  return (
    <header className={css.header}>
      <div className={css.wrapper}>
        <Link href="/" className={css.logo}>
          <svg width="136" height="15">
            <use href="/TravelTrucks.svg"></use>
          </svg>
        </Link>
        <nav className={css.navWrapper}>
          <ul className={css.navList}>
            <li className={css.navItem}>
              <Link className={css.navLink} href="/">
                Home
              </Link>
            </li>
            <li className={css.navItem}>
              <Link
                className={`${css.navLink} ${pathname === "/catalog" ? css.active : ""}`}
                href="/catalog"
              >
                Catalog
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;

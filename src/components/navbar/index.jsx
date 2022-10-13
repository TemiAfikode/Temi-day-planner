import { useSession } from "next-auth/react";
import Link from "next/link";
import Icon from "@mdi/react";
import { mdiClose, mdiMenu } from "@mdi/js";
import style from "./navbar.module.css";
import { useState } from "react";

export default function Navbar() {
  const [toggle, setToggle] = useState(false);
  const { status } = useSession();

  return (
    <nav className={style["navbar-main"]}>
      <div className={style["main-wrapper"]}>
        <div className={"container " + style["nav-container"]}>
          <div className={style["nav-logo"]}>
            <img src="/imgs/logo.svg" alt="logo image" />
          </div>
          <MenuList status={status} type="desktop" />
        </div>
        <div
          className={style["menu-toggle"]}
          onClick={() => setToggle(!toggle)}
        >
          {toggle ? (
            <Icon path={mdiClose} className={style["menu-icon"]} />
            ) : (
            <Icon path={mdiMenu} className={style["menu-icon"]} />
          )}
        </div>
        <div className={style["navbar-mobile-drop"]}>
          {toggle && <MenuList status={status} type="mobile" />}
        </div>
      </div>
    </nav>
  );
}

const MenuList = ({ status, type }) => (
  <ul className={`${style["nav-menu-list"]} ${style[type]}`}>
    <li>
      <a href="#home">Home</a>
    </li>
    <li>
      <a href="#about">About</a>
    </li>
    <li>
      <a href="#service">Features</a>
    </li>
    <li>
      <a href="#pricing">Pricing</a>
    </li>
    {status === "authenticated" && (
      <li className={style["dashboard-link"]}>
        <Link href="/dashboard">Dashboard</Link>
      </li>
    )}
  </ul>
);

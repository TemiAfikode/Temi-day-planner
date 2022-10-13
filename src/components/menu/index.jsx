import {
  mdiClock,
  mdiHome,
  mdiMenu,
  mdiPlus,
  mdiPower,
  mdiStar,
} from "@mdi/js";
import Icon from "@mdi/react";
import Link from "next/link";
import React, { useContext } from "react";
import userContext from "context/user/userContext";
import style from "./menu.module.css";
import uiContext from "context/ui/uiContext";
import { ADD_TASK_MODAL } from "context/ui/uiType";

export default function Menu({ setQueryState, setOpenMenu }) {
  const { logoutUser } = useContext(userContext);
  const { setState } = useContext(uiContext);

  return (
    <div className={style["menu-item-wrapper"]}>
      <ul className={style["menu-item-list"]}>
        <li>
          <Icon path={mdiMenu} className={style["menu-icon"]} />{" "}
          <h2>Dashboard</h2>
        </li>
        <li>
          <Link href="/">
            <a>
              <Icon path={mdiHome} className={style["menu-icon"]} />
              <h2>Home</h2>
            </a>
          </Link>
        </li>
        <li
          onClick={() => {
            if (setOpenMenu) setOpenMenu(false);
            setState({ type: ADD_TASK_MODAL });
          }}
        >
          <a>
            <Icon path={mdiPlus} className={style["menu-icon"]} />{" "}
            <h2> Add Task</h2>
          </a>
        </li>
        <li
          onClick={() => {
            if (setOpenMenu) setOpenMenu(false);
            setQueryState((s) => ({ ...s, date: new Date() }));
          }}
        >
          <a>
            <Icon path={mdiClock} className={style["menu-icon"]} />{" "}
            <h2> Today&apos;s Tasks</h2>
          </a>
        </li>
        <li
          onClick={() => {
            if (setOpenMenu) setOpenMenu(false);
            logoutUser();
          }}
        >
          <a>
            <Icon path={mdiPower} className={style["menu-icon"]} />{" "}
            <h2> Logout</h2>
          </a>
        </li>
      </ul>
    </div>
  );
}

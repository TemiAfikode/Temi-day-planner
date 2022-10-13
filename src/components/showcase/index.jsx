import Icon from "@mdi/react";
import { mdiMouse } from "@mdi/js";
import style from "./showcase.module.css";
import Link from "next/link";

export default function Showcase() {
  return (
    <header className={style["showcase"]}>
      <div className={style["showcase-main"]}>
        <img
          className={style["design-eclipse"]}
          src="/imgs/design-eclipse.svg"
          alt=""
        />
        <div className={"container " + style["showcase-container"]}>
          <span className={style["mouse-scroll"]}>
            <Icon path={mdiMouse} className={style["icon-img"]} /> Scroll
          </span>
          <div className={style["showcase-lhs"]}>
            <h1>Stay Organised and achieve more daily...</h1>
            <p>
              With Temi Task Manager you can organise your daily to do tasks and
              priotise them in a way that you wouldn&apos;t leave any undone..
            </p>
            <Link href="/login">
              <a className="btn btn-primary">Free Acount</a>
            </Link>
          </div>
          <div className={style["showcase-rhs"]}>
            <img src="/imgs/showcase-img.svg" alt="showcase image" />
          </div>
        </div>
      </div>
    </header>
  );
}

import {
  mdiFormatListBulleted,
  mdiPlaylistEdit,
  mdiPlaylistMinus,
  mdiPlaylistStar,
  mdiShareVariant,
} from "@mdi/js";
import Icon from "@mdi/react";
import React from "react";
import style from "./features.module.css";

export default function Features() {
  return (
    <section className={style["features"]}>
      <div className={"container " + style["feature-container"]}>
        <h1 className="about-header">Features</h1>
        <div className={style["features-wrapper"]}>
          <ul className={style["feature-list"]}>
            <li className={style["feature-item"]}>
              <div className={style["feature-item-wrapper"]}>
                <div className={style["card-header"]}>
                  <div>
                    <Icon
                      path={mdiFormatListBulleted}
                      className={style["feature-icon"]}
                    />
                  </div>
                  <h2>Create Task</h2>
                </div>
                <div className={style["card-body"]}>
                  <p>
                    Create task, as many as you want. Every task is tie to the
                    day it&apos;s created. This makes it easy to track all your
                    task all through the week or month.
                  </p>
                </div>
              </div>
            </li>
            <li className={style["feature-item"]}>
              <div className={style["feature-item-wrapper"]}>
                <div className={style["card-header"]}>
                  <div className={style["card-green"]}>
                    <Icon
                      path={mdiPlaylistEdit}
                      className={style["feature-icon"]}
                    />
                  </div>
                  <h2>Edit Task</h2>
                </div>
                <div className={style["card-body"]}>
                  <p>
                    Edit tasks at anytime, when you feel you can not meet up
                    with task you can update the task. Or when the nature of the
                    task changed.
                  </p>
                </div>
              </div>
            </li>
            <li className={style["feature-item"]}>
              <div className={style["feature-item-wrapper"]}>
                <div className={style["card-header"]}>
                  <div className={style["card-purple"]}>
                    <Icon
                      path={mdiPlaylistMinus}
                      className={style["feature-icon"]}
                    />
                  </div>
                  <h2>Delete Task</h2>
                </div>
                <div className={style["card-body"]}>
                  <p>
                    Delete tasks that you have accomplished to clear up your
                    board. You can delete task you don&apos;t to work on.
                  </p>
                </div>
              </div>
            </li>
            <li className={style["feature-item"]}>
              <div className={style["feature-item-wrapper"]}>
                <div className={style["card-header"]}>
                  <div className={style["card-yellow"]}>
                    <Icon
                      path={mdiPlaylistStar}
                      className={style["feature-icon"]}
                    />
                  </div>
                  <h2>Prioritize Task</h2>
                </div>
                <div className={style["card-body"]}>
                  <p>
                    Some task might be more important than others, tasks are
                    assigned with different colors to be easily differentiated.
                    This way you can lost an important task in the queue.
                  </p>
                </div>
              </div>
            </li>
            <li className={style["feature-item"]}>
              <div className={style["feature-item-wrapper"]}>
                <div className={style["card-header"]}>
                  <div className={style["card-gray"]}>
                    <Icon
                      path={mdiShareVariant}
                      className={style["feature-icon"]}
                    />
                  </div>
                  <h2>Share Task</h2>
                </div>
                <div className={style["card-body"]}>
                  <p>
                    Share task with family or friends, we believe two heads is
                    better one. Share task with someone with there email address
                    it will make you achieve tasks quickly.
                  </p>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}

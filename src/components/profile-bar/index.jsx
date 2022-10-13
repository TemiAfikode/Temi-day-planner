import { mdiAccountCircle, mdiMagnify } from "@mdi/js";
import Icon from "@mdi/react";
import taskContext from "context/task/taskContext";
import { useContext, useState } from "react";
import style from "./profile-bar.module.css";

export default function ProfileBar({
  user,
  queryState,
  setQueryState,
  setRefreshState,
}) {
  const [value, setValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { getTasks } = useContext(taskContext);

  const onSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (!value) {
      setIsLoading(false);
      return;
    }
    setRefreshState(false);
    setQueryState((s) => ({
      ...s,
      date: "",
      status: "",
      tag: "",
      search: value,
    }));
    getTasks(user._id, queryState);
    setIsLoading(false);
  };

  return (
    <nav className={style["profile-nav"]}>
      <div className={style["profile-nav-container"]}>
        <div className={style["profile-nav-rhs"]}>
          <div className={style["profile-nav-logo"]}>
            <img src="/imgs/logo.svg" alt="logo" />
          </div>
          <form className={style["search-form"]} onSubmit={onSubmit}>
            {isLoading && <span className={style["form-loading"]}></span>}

            <input
              type="text"
              className={style["search-input"]}
              placeholder="Search for task"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
            <span className={style["search-form-icon"]}>
              <Icon path={mdiMagnify} className={style["search-icon"]} />
            </span>
          </form>
        </div>
        <div className={style["profile-nav-lhs"]}>
          <div className={style["avatar-wrapper"]}>
            <Icon path={mdiAccountCircle} className={style["avatar-icon"]} />
          </div>
          {user && (
            <p
              className={style["profile-nav-fullname"]}
            >{`${user.firstname} ${user.lastname}`}</p>
          )}
        </div>
      </div>
    </nav>
  );
}

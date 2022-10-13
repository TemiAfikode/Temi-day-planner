import { useContext, useEffect, useState } from "react";
import ProfileBar from "components/profile-bar";
import ProfileContent from "components/profile-content";
import style from "./dashboard.module.css";
import "react-datepicker/dist/react-datepicker.css";
import Menu from "components/menu";
import {
  AddTaskModal,
  ProcessingModal,
  ShareTaskModal,
  ViewTaskModal,
} from "components/modal";
import Icon from "@mdi/react";
import { mdiClose, mdiMenu } from "@mdi/js";
import taskContext from "context/task/taskContext";
import uiContext from "context/ui/uiContext";
import {
  ADD_TASK_MODAL,
  CLOSE_TASK_MODAL,
  EDIT_TASK_MODAL,
  LOADING_MODAL,
  SHARE_TASK_MODAL,
  VIEW_TASK_MODAL,
} from "context/ui/uiType";

const getModalContent = (type, user) => {
  switch (type) {
    case ADD_TASK_MODAL:
      return <AddTaskModal user={user} />;
    case EDIT_TASK_MODAL:
      return <AddTaskModal edit={true} user={user} />;
    case LOADING_MODAL:
      return <ProcessingModal user={user} />;
    case VIEW_TASK_MODAL:
      return <ViewTaskModal user={user} />;
    case SHARE_TASK_MODAL:
      return <ShareTaskModal user={user} />;
  }
};

const queryOptions = {
  search: "",
  limit: 5,
  page: 1,
  date: "",
  tag: "",
  status: "",
};

export default function Dashboard({ user }) {
  const [queryOpt, setQueryOpt] = useState(queryOptions);
  const [refreshTasks, setRefreshTasks] = useState(true);
  const [openMenu, setOpenMenu] = useState(false);

  const { getTasks } = useContext(taskContext);
  const { open, setState, type } = useContext(uiContext);

  useEffect(() => {
    if (refreshTasks) {
      if (!queryOpt.date && !queryOpt.search) {
        setQueryOpt((s) => ({ ...s, date: new Date() }));
      }

      getTasks(user._id, queryOpt);
    }
  }, [queryOpt]);

  return (
    <div className={style["profile"]}>
      <aside className={style["menu"]}>
        <Menu setQueryState={setQueryOpt} user={user} />
      </aside>
      <main className={style["profile-main"]}>
        <ProfileBar
          user={user}
          queryState={queryOpt}
          setQueryState={setQueryOpt}
          setRefreshState={setRefreshTasks}
        />
        <ProfileContent
          user={user}
          queryState={queryOpt}
          setQueryState={setQueryOpt}
          setRefreshState={setRefreshTasks}
        />
        <button
          className={style["floating-btn"]}
          onClick={() => setOpenMenu(!openMenu)}
        >
          {openMenu ? (
            <Icon path={mdiClose} className={style["floating-icon"]} />
          ) : (
            <Icon path={mdiMenu} className={style["floating-icon"]} />
          )}
        </button>
      </main>
      {open && (
        <div className="modal">
          <div className="modal-container">
            <div className="modal-content">
              <button
                className="close-modal"
                onClick={() => setState({ type: CLOSE_TASK_MODAL })}
              >
                <Icon path={mdiClose} className="close-modal-icon" />
              </button>
              {getModalContent(type, user)}
            </div>
          </div>
        </div>
      )}
      {openMenu && (
        <div className={style["menu-mobile"]}>
          <Menu setQueryState={setQueryOpt} user={user} setOpenMenu={setOpenMenu} />
        </div>
      )}
    </div>
  );
}

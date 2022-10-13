import React, { useContext, useEffect, useState } from "react";
import {
  mdiCalendar,
  mdiChevronDoubleLeft,
  mdiChevronDoubleRight,
  mdiDotsVertical,
  mdiFilterVariant,
  mdiLoading,
  mdiPlus,
  mdiShareVariant,
} from "@mdi/js";
import Icon from "@mdi/react";
import { format, parseISO } from "date-fns";
import style from "./profile-content.module.css";
import ReactDatePicker from "react-datepicker";
import { CANCEL_TASK, DELETE_TASK } from "./types";
import taskContext from "context/task/taskContext";
import uiContext from "context/ui/uiContext";
import {
  ADD_TASK_MODAL,
  EDIT_TASK_MODAL,
  SHARE_TASK_MODAL,
  VIEW_TASK_MODAL,
} from "context/ui/uiType";
import Menu from "components/menu";

const optionsState = {
  open: false,
  type: "",
  id: "",
};

const filterOptions = [
  { value: "todayTask", label: "Today's Tasks" },
  { value: "due", label: "Due Task" },
  { value: "upcoming", label: "Upcoming Task" },
  { value: "urgent", label: "Urgent Tasks" },
  { value: "important", label: "Important Tasks" },
  { value: "needful", label: "Needful Tasks" },
  { value: "neccessary", label: "Neccessary Tasks" },
  { value: "usual", label: "Usual Tasks" },
  { value: "completed", label: "Completed Tasks" },
  { value: "cancelled", label: "Cancelled Tasks" },
];
const optionsValue = [
  { value: "view", label: "View", action: VIEW_TASK_MODAL },
  { value: "edit", label: "Edit", action: EDIT_TASK_MODAL },
  { value: "share", label: "Share", action: SHARE_TASK_MODAL },
  { value: "delete", label: "Delete", action: DELETE_TASK },
  { value: "cancel", label: "Cancel", action: CANCEL_TASK },
];
const filterOptionsStatus = [
  { value: "done", label: "Done" },
  { value: "pending", label: "Pending" },
  { value: "cancelled", label: "Cancelled" },
];

export default function ProfileContent({
  user,
  queryState,
  setQueryState,
  setRefreshState,
}) {
  const [startDate, setStartDate] = useState(new Date());
  const [options, setOptions] = useState(optionsState);
  const [optionsFilter, setOptionsFilter] = useState(false);
  const [optionsFilterStatus, setOptionsFilterStatus] = useState(false);
  const [openCalendar, setOpenCalendar] = useState(false);

  const { getTasks, updateTask, tasks, deleteLoading, pagination, deleteTask } =
    useContext(taskContext);
  const { setState } = useContext(uiContext);

  useEffect(() => {
    getTasks(user._id, queryState);
  }, []);

  const onDropdownOpen = (type, id) => {
    if (options.open) return onDropdownClose();
    setOptions({ open: true, type, id });
  };
  const onDropdownClose = () => {
    setOptions(optionsState);
  };
  const handleOpenModal = (type, payload = null) => {
    setOptionsFilter(false);
    onDropdownClose();
    switch (type) {
      case EDIT_TASK_MODAL:
      case VIEW_TASK_MODAL:
      case SHARE_TASK_MODAL:
        return setState({ type, data: payload });
      case CANCEL_TASK:
        return updateTask(payload._id, { status: "cancelled" });
      case DELETE_TASK:
        return deleteTask(payload._id);
    }
  };

  const handleUpdate = (task) => {
    console.log(task);
    updateTask(task._id, {
      tag: task.tag !== "completed" ? "completed" : "usual",
      status: task.status === "done" ? "pending" : "done",
    });
  };

  return (
    <div className={style["profile-content"]}>
      <div className={style["profile-content-lhs"]}>
        <div className={style["top-content"]}>
          <h1 className={style["my-task-today"]}>My Tasks</h1>
          <button
            className={style["calendar-btn"]}
            onClick={() => setOpenCalendar(!openCalendar)}
          >
            <Icon path={mdiCalendar} className={style["task-icon"]} />
          </button>
          {openCalendar && (
            <div className={style["mobile-calendar"]}>
              <div className={style["calendar-wrapper"]}>
                <ReactDatePicker
                  selected={startDate}
                  onChange={(date) => {
                    setStartDate(date);
                    setOpenCalendar(false);
                    setQueryState((s) => ({ ...s, date: date }));
                  }}
                  inline
                />
              </div>
            </div>
          )}
        </div>
        <div className={style["center-task-board"]}>
          <div className={style["filter-wrapper"]}>
            <div onClick={() => setOptionsFilterStatus(!optionsFilterStatus)}>
              <p>Filter by status </p>
              <span>
                <Icon path={mdiFilterVariant} className={style["task-icon"]} />
              </span>
            </div>
            <div onClick={() => setOptionsFilter(!optionsFilter)}>
              <p>Filter by tag </p>
              <span>
                <Icon path={mdiFilterVariant} className={style["task-icon"]} />
              </span>
            </div>
            {optionsFilterStatus && (
              <div
                className={`${style["dropdown"]} ${style["filter-dropdown"]} ${style["filter-dropdown-left"]}`}
              >
                <ul>
                  {filterOptionsStatus.map((f, i) => (
                    <li
                      className={`${
                        queryState.status === f.value
                          ? style["active-option"]
                          : ""
                      }`}
                      onClick={() => {
                        setOptionsFilterStatus(false);
                        setRefreshState(true);
                        const value =
                          queryState.status !== f.value ? f.value : "";
                        setQueryState((s) => ({ ...s, status: value }));
                      }}
                      key={`filter-task-${i}`}
                    >
                      <p>{f.label}</p>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {optionsFilter && (
              <div
                className={`${style["dropdown"]} ${style["filter-dropdown"]} ${style["filter-dropdown-right"]}`}
              >
                <ul>
                  {filterOptions.map((f, i) => (
                    <li
                      className={`${
                        queryState.tag === f.value ? style["active-option"] : ""
                      }`}
                      onClick={() => {
                        setOptionsFilter(false);
                        setRefreshState(true);
                        const value = queryState.tag !== f.value ? f.value : "";
                        setQueryState((s) => ({ ...s, tag: value }));
                      }}
                      key={`filter-task-${i}`}
                    >
                      <p>{f.label}</p>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className={style["task-list-wrapper"]}>
            <ul className={style["task-list"]}>
              {tasks.length > 0 &&
                tasks.map((tk) => (
                  <li
                    key={`task-list-${tk._id}`}
                    className={`${style["task-card"]} ${style[tk.tag]}`}
                  >
                    <div className={style["task-card-header"]}>
                      <h3 className={`task-title ${style[tk.status]}`}>
                        {tk.task}
                      </h3>
                      <div>
                        <span
                          onClick={() =>
                            onDropdownOpen(ADD_TASK_MODAL, `task-${tk._id}`)
                          }
                        >
                          <Icon
                            path={mdiDotsVertical}
                            className={style["task-icon"]}
                          />
                        </span>
                      </div>
                    </div>
                    <div className={style["task-card-body"]}>
                      <div className={style["status-wrapper"]}>
                        <p>{tk.status}</p>
                        <span>
                          <Icon
                            path={mdiShareVariant}
                            className={style["task-icon-share"]}
                          />
                          <span>{tk.sharedTo.length}</span>
                        </span>
                      </div>
                      <div>
                        <p className={style["task-card-date"]}>
                          {format(parseISO(tk.dueDate), "EEE. MMM. do, yyyy")}
                        </p>
                        <div className={style["task-checker-wrapper"]}>
                          {tk.status !== "cancelled" && (
                            <>
                              <input
                                type="checkbox"
                                name="taskchecker"
                                disabled={deleteLoading}
                                id={`task-checker-${tk._id}`}
                                className={style["task-checker"]}
                                value={tk.status}
                                checked={tk.status === "done"}
                                onChange={() => handleUpdate(tk)}
                              />
                              <label
                                htmlFor={`task-checker-${tk._id}`}
                                className={style["task-checker-label"]}
                              ></label>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                    {options.open && options.id === `task-${tk._id}` && (
                      <div
                        className={`${style["dropdown"]} ${style["options-dropdown"]}`}
                      >
                        <ul>
                          {optionsValue.map((f, i) => (
                            <li
                              onClick={() => handleOpenModal(f.action, tk)}
                              key={`select-options-task-${i}`}
                            >
                              <p>{f.label}</p>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </li>
                ))}
            </ul>
          </div>
          {pagination && (
            <div className={style["pagination"]}>
              {pagination?.prev && (
                <button
                  className={style["prev-btn"]}
                  onClick={() => {
                    setRefreshState(true);
                    setQueryState((s) => ({ ...s, page: s.page - 1 }));
                  }}
                >
                  <Icon
                    path={mdiChevronDoubleLeft}
                    className={style["task-icon"]}
                  />
                </button>
              )}
              {pagination?.next && (
                <button
                  className={style["next-btn"]}
                  onClick={() => {
                    setRefreshState(true);
                    setQueryState((s) => ({ ...s, page: s.page + 1 }));
                  }}
                >
                  <Icon
                    path={mdiChevronDoubleRight}
                    className={style["task-icon"]}
                  />
                </button>
              )}
            </div>
          )}
        </div>
      </div>
      <div className={style["profile-content-rhs"]}>
        <div className={style["profile-content-rhs-content"]}>
          <div className={style["content-greeting"]}>
            <h2>
              <span>Hello, {user.firstname}!</span> You have {tasks.length}{" "}
              tasks today.
            </h2>
          </div>
          <div className={style["create-task-container"]}>
            <div className={style["show-today-date"]}>
              <p>{format(new Date(), "MMMM dd, yyyy")}</p>
              <h2>Today</h2>
            </div>
            <div className={style["add-task-btn"]}>
              <button onClick={() => setState({ type: ADD_TASK_MODAL })}>
                <Icon path={mdiPlus} className={style["add-icon"]} />{" "}
                <span>Add Task</span>
              </button>
            </div>
          </div>
          <div className={style["calendar-container"]}>
            <ReactDatePicker
              selected={startDate}
              onChange={(date) => {
                setStartDate(date);
                setQueryState((s) => ({ ...s, date: date }));
              }}
              inline
            />
          </div>
        </div>
      </div>
    </div>
  );
}

const FloatingBtn = () => {
  return (
    <div className="floating-btn">
      <div>
        <Menu />
      </div>
    </div>
  );
};
